/**
 * Add an item to a list, if it does not exist.
 * If it does exist, however, remove it.
 * @param list The array that might contain the given item.
 * @param item The element that should be added or removed.
 */
export declare function toggle<I>(list: I[], item: I): I[];
/**
 * Shallow compares two values (most probably objects).
 * @param a any.
 * @param b any.
 */
export declare function isShallowEqual(a: any, b: any): boolean;
