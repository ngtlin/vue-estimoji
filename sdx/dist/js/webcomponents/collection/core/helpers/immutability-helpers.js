import isNil from "lodash-es/isNil";
/**
 * Add an item to a list, if it does not exist.
 * If it does exist, however, remove it.
 * @param list The array that might contain the given item.
 * @param item The element that should be added or removed.
 */
export function toggle(list, item) {
    // Item does not exist, add it
    if (list.indexOf(item) === -1) {
        return [...list, item];
    }
    // Item already exists, remove it
    return list.filter((currentItem) => currentItem !== item);
}
/**
 * Shallow compares two values (most probably objects).
 * @param a any.
 * @param b any.
 */
export function isShallowEqual(a, b) {
    // Handle references or primitives
    if (a === b) {
        return true;
    }
    // Both values are nullish
    if (isNil(a) && isNil(b)) {
        return a === b;
    }
    // One value is nullish, the other is not
    if ((isNil(a) && !isNil(b)) || (!isNil(a) && isNil(b))) {
        return false;
    }
    // Now it's clear that both values are objects - compare key by key
    return (Object.keys(a).length === Object.keys(b).length
        &&
            Object.keys(a).every((key) => b.hasOwnProperty(key) && a[key] === b[key]));
}
