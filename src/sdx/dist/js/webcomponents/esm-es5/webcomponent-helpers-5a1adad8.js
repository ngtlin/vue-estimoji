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
function getSlot(wc) {
    if (!wc.shadowRoot) {
        return null;
    }
    // Look for native <slot /> element
    var nativeSlot = wc.shadowRoot.querySelector("slot");
    if (nativeSlot) {
        return nativeSlot;
    }
    return wc.querySelector(".sc-" + wc.tagName.toLowerCase() + "-s");
}
/**
 * Sets up an observer that is triggered when child nodes in <slot /> change.
 * Works on both modern browsers and polyfilled old browsers.
 * @param wc Web Component to install observer.
 * @param callback Function executed on change.
 */
function installSlotObserver(wc, callback) {
    // Listen to children changes
    var observer = new MutationObserver(function () { return callback(); });
    var observeOptions = {
        childList: true,
        characterData: true,
        subtree: true
    };
    var slot = getSlot(wc);
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
function isNativeSlot(node) {
    return !!node.tagName && node.tagName.toLowerCase() === "slot";
}
/**
 * Evaluates a function string and returns the result.
 * Do nothing if the passed parameter already is a function.
 * @param fn Function - either as a string or as a function itself
 */
function parseFunction(fn) {
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
function closest(sourceEl, target) {
    var currentEl = sourceEl;
    var matches = function (sourceEl, target) {
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
function getPreviousFromList(list, el) {
    var index;
    var newIndex = 0;
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
function getNextFromList(list, el) {
    var index;
    var newIndex = 0;
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
function sortByAppearanceInDomTree(a, b) {
    var position = a.compareDocumentPosition(b);
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
function computedProperty(property) {
    var _b;
    return property ? (_b = {}, _b[property] = true, _b) : {};
}
/**
 * Tries to parse the argument (e.g. a JSON string) and return the result (e.g. an object).
 * Returns the argument if it's already an object.
 * Returns an empty object if argument is falsy.
 * @param json Something that will be parsed
 */
function parseJson(json) {
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
export { parseFunction as a, getNextFromList as b, computedProperty as c, closest as d, getPreviousFromList as g, installSlotObserver as i, parseJson as p, sortByAppearanceInDomTree as s };
