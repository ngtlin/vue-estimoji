import './isNil-ec331784.js';

/**
 * Add an item to a list, if it does not exist.
 * If it does exist, however, remove it.
 * @param list The array that might contain the given item.
 * @param item The element that should be added or removed.
 */
function toggle(list, item) {
    // Item does not exist, add it
    if (list.indexOf(item) === -1) {
        return [...list, item];
    }
    // Item already exists, remove it
    return list.filter((currentItem) => currentItem !== item);
}

export { toggle as t };
