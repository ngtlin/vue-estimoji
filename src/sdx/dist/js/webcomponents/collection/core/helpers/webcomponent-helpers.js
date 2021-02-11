/**
 * A collection of useful Stencil components methods, e.g. for making sure that
 * modern browsers with native web component support and old browsers
 * using polyfills produce the same results.
 */
/**
 * Returns the <slot /> element.
 * Works on both modern browsers and polyfilled old browsers,
 * where a <div class="slot" /> is used as fallback.
 * Note: only works *after* initial render() (when slot is created).
 * @param wc Web Component to read <slot /> from.
 */
export function getSlot(wc) {
    if (!wc.shadowRoot) {
        return null;
    }
    // Look for native <slot /> element
    const nativeSlot = wc.shadowRoot.querySelector("slot");
    if (nativeSlot) {
        return nativeSlot;
    }
    return wc.querySelector(`.sc-${wc.tagName.toLowerCase()}-s`);
}
/**
 * Sets up an observer that is triggered when child nodes in <slot /> change.
 * Works on both modern browsers and polyfilled old browsers.
 * @param wc Web Component to install observer.
 * @param callback Function executed on change.
 */
export function installSlotObserver(wc, callback) {
    // Listen to children changes
    const observer = new MutationObserver(() => callback());
    const observeOptions = {
        childList: true,
        characterData: true,
        subtree: true
    };
    const slot = getSlot(wc);
    if (!slot) {
        return;
    }
    if (isNativeSlot(slot)) {
        observer.observe(wc, observeOptions);
    }
    else {
        observer.observe(slot, observeOptions);
    }
}
/**
 * Checks if a given node is a native slot by validating its tag name.
 * Required to know if a native web component functions can be called (e.g. slot.assignedNodes()).
 * @param node Node to check
 */
export function isNativeSlot(node) {
    return !!node.tagName && node.tagName.toLowerCase() === "slot";
}
/**
 * Returns all child nodes of the <slot /> tag (recursively - if child node is a <slot /> again).
 * Works on both modern browsers and polyfilled old browsers.
 * @param wc Web Component to read slots child nodes from.
 */
export function getAllSlotChildNodes(wc, slot, collection) {
    slot = slot || getSlot(wc);
    collection = collection || [];
    if (!slot) {
        return [];
    }
    // Read children from slot
    if (isNativeSlot(slot)) { // modern browsers with native web component support
        const assignedNodes = slot.assignedNodes();
        for (let i = 0; i < assignedNodes.length; ++i) {
            const assignedNode = assignedNodes[i];
            if (isNativeSlot(assignedNode)) {
                getAllSlotChildNodes(wc, assignedNode, collection);
            }
            else {
                collection.push(assignedNode);
            }
        }
    }
    else { // old browsers with no web component support
        const polyfillSlotChildNodes = slot.childNodes;
        for (let i = 0; i < polyfillSlotChildNodes.length; ++i) {
            const polyfillSlotChildNode = polyfillSlotChildNodes[i];
            collection.push(polyfillSlotChildNode);
        }
    }
    return collection;
}
/**
 * Returns all child nodes of the <slot /> tag (recursively) that match a given tag name.
 * @param wc Web Component to read slots child nodes from.
 * @param tagName Tag to look for, e.g. "sdx-select-option".
 * @param collection Internal for recursion.
 * @param children Internal for recursion.
 */
export function getAllSlotChildNodesByTagName(wc, tagName, collection, children) {
    collection = collection || [];
    children = children || getAllSlotChildNodes(wc);
    for (let i = 0; i < children.length; ++i) {
        const child = children[i];
        if (child.tagName && child.tagName.toLowerCase() === tagName.toLowerCase()) {
            collection.push(child);
        }
        if (child.childNodes.length) {
            getAllSlotChildNodesByTagName(wc, tagName, collection, Array.prototype.slice.call(child.childNodes));
        }
    }
    return collection;
}
/**
 * Evaluates a function string and returns the result.
 * Do nothing if the passed parameter already is a function.
 * @param fn Function - either as a string or as a function itself
 */
export function parseFunction(fn) {
    if (typeof fn === "string") {
        return new Function(fn);
    }
    else if (typeof fn === "function") {
        return fn;
    }
    else {
        return new Function();
    }
}
/**
 * Traverses up from a given DOM node searching for a given selector or node.
 * Returns the first match.
 * @param sourceEl Starting DOM node.
 * @param selector Selector or DOM node.
 */
export function closest(sourceEl, target) {
    let currentEl = sourceEl;
    const matches = (sourceEl, target) => {
        if (typeof target === "object") {
            return sourceEl === target;
        }
        return sourceEl.matches(target);
    };
    while (!matches(currentEl, target)) {
        if (currentEl.parentElement) {
            currentEl = currentEl.parentElement;
        }
        else {
            return null;
        }
    }
    return currentEl;
}
/**
 * Returns the previous element of a list. Start from the end
 * if the given element is the first on the list.
 * @param list Array to pick element from.
 * @param el Item that will be used to get the index.
 */
export function getPreviousFromList(list, el) {
    let index;
    let newIndex = 0;
    if (el) {
        index = list.indexOf(el);
    }
    if (index !== undefined) {
        if ((index - 1) >= 0) { // previous exists
            newIndex = index - 1;
        }
        else { // already at the beginning, jump to the end
            newIndex = list.length - 1;
        }
    }
    return list[newIndex];
}
/**
 * Returns the next element of a list. Start from the beginning
 * if the given element is the last on the list.
 * @param list Array to pick element from.
 * @param el Item that will be used to get the index.
 */
export function getNextFromList(list, el) {
    let index;
    let newIndex = 0;
    if (el) {
        index = list.indexOf(el);
    }
    if (index !== undefined) {
        if ((index + 1) < list.length) { // next exists
            newIndex = index + 1;
        }
        else {
            newIndex = 0;
        }
    }
    return list[newIndex];
}
/**
 * Sorts a list of DOM nodes by their appearance in the DOM tree.
 */
export function sortByAppearanceInDomTree(a, b) {
    const position = a.compareDocumentPosition(b);
    return (position <= Node.DOCUMENT_POSITION_PRECEDING
        ? position <= Node.DOCUMENT_POSITION_FOLLOWING
            ? 1
            : 0
        : -1);
}
/**
 * Builds an object with one property using a given name and sets it to true if truthy.
 * Example: "foo" => { foo: true },
 * Example: "" => {}
 * @param property Name of the property
 */
export function computedProperty(property) {
    return property ? { [property]: true } : {};
}
/**
 * Tries to parse the argument (e.g. a JSON string) and return the result (e.g. an object).
 * Returns the argument if it's already an object.
 * Returns an empty object if argument is falsy.
 * @param json Something that will be parsed
 */
export function parseJson(json) {
    if (json instanceof Object) {
        return json;
    }
    if (typeof json === "string") {
        try {
            return JSON.parse(json);
        }
        catch (_a) {
        }
    }
    return undefined;
}
