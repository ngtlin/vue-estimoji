import { __values } from "tslib";
/**
 * Calls the callback function when the document has been completely parsed.
 * @param {callback} value The callback function to execute.
 */
export function onDocumentReady(callback) {
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false);
        callback();
    }
    if (document.readyState === "complete") {
        setTimeout(callback);
    }
    else {
        document.addEventListener("DOMContentLoaded", completed, false);
        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed, false);
    }
}
export function searchAndInitialize(selector, callback, initSelector) {
    var e_1, _a;
    if (!callback) {
        throw new Error("The callback cannot be undefined");
    }
    var elements = document.querySelectorAll(selector);
    try {
        for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
            var e = elements_1_1.value;
            var initElement = e;
            if (initSelector) {
                initElement = initSelector(e);
            }
            if (initElement.getAttribute("data-init") === "auto") {
                callback(e);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * Utils.clamp(number, 0, 255)
 *
 * @param {Number} value The number to clamp
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/**
 * A polyfill for Event.preventDefault().
 * @param {Event} event - The event to prevent the default action.
 */
export function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
}
/**
 * A polyfill for Node.remove().
 * @param {Node} node - The node to remove.
 */
export function remove(node) {
    if (!node || !node.parentNode) {
        return;
    }
    node.parentNode.removeChild(node);
}
/**
 * A simple polyfill for the Array.find() method.
 * @param {Array} array - The array to search in.
 * @param {function} expression - The expression to evaluate. Must return true if the element matches.
 */
export function find(array, expression) {
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (expression(item) === true) {
            return item;
        }
    }
    return undefined;
}
/**
 * Checks the useragent and returns the Microsoft Internet Explorer / Edge version.
 * If another browser is detected 0 is returned.
 */
export function internetExplorerOrEdgeVersion(userAgent) {
    if (userAgent === void 0) { userAgent = navigator.userAgent; }
    // handle IE and Edge
    var ieOrEdge = userAgent.search(/MSIE |Edge[/]/);
    if (ieOrEdge > 0) {
        return parseInt(userAgent.substring(ieOrEdge + 5, userAgent.indexOf(".", ieOrEdge)), 10);
    }
    // handle IE11
    if (userAgent.indexOf("Trident/") > 0) {
        var rv = userAgent.indexOf("rv:");
        return parseInt(userAgent.substring(rv + 3, userAgent.indexOf(".", rv)), 10);
    }
    return 0;
}
/**
 * Tries to move a child element to the top by scrolling the parent element, if it is not already fully visible.
 */
export function scrollIntoView(child) {
    var parent = child.parentNode;
    var parentRect = parent.getBoundingClientRect();
    var childRect = child.getBoundingClientRect();
    var isFullyVisible = childRect.top >= parentRect.top && childRect.bottom <= parentRect.top + parent.clientHeight;
    if (!isFullyVisible) {
        parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,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O0lBRWxILElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQTtLQUNyRTtBQUNILENBQUMiLCJmaWxlIjoibWFpbi9zcmMvVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBkb2N1bWVudCBoYXMgYmVlbiBjb21wbGV0ZWx5IHBhcnNlZC5cbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IHZhbHVlIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb25Eb2N1bWVudFJlYWR5KGNhbGxiYWNrOiAoZT86IEV2ZW50KSA9PiB2b2lkKSB7XG4gIGZ1bmN0aW9uIGNvbXBsZXRlZCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQsIGZhbHNlKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBjb21wbGV0ZWQsIGZhbHNlKVxuICAgIGNhbGxiYWNrKClcbiAgfVxuXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrKVxuICB9IGVsc2Uge1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSlcblxuICAgIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGNvbXBsZXRlZCwgZmFsc2UpXG4gIH1cbn1cblxuLyoqXG4gKiBTZWFyY2hlcyBmb3IgZWxlbWVudHMgd2l0aCB0aGUgZ2l2ZW4gc2VsZWN0b3IgYW5kIGNhbGxzIHRoZSBjYWxsYmFja1xuICogZnVuY3Rpb24gaWYgdGhlIGBkYXRhLWluaXRgIGF0dHJpYnV0ZSBpcyBwcmVzZW50IG9uIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtzZWxlY3Rvcn0gdmFsdWUgVGhlIHF1ZXJ5LlxuICogQHBhcmFtIHtjYWxsYmFja30gdmFsdWUgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGluaXRpYWxpemUgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBpbml0U2VsZWN0b3IgVGhlIGluaXRpdGFsaXphdGlvbiBlbGVtZW50IHNlbGVjdG9yIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoQW5kSW5pdGlhbGl6ZTxcbiAgSyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcFxuICA+KFxuICAgIHNlbGVjdG9yOiBLLFxuICAgIGNhbGxiYWNrOiAoZWw6IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSkgPT4gdm9pZCxcbiAgICBpbml0U2VsZWN0b3I/OiAoZWw6IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSkgPT4gRWxlbWVudFxuICApOiB2b2lkXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoQW5kSW5pdGlhbGl6ZTxcbiAgRSBleHRlbmRzIEVsZW1lbnRcbiAgPihcbiAgICBzZWxlY3Rvcjogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiAoZWw6IEUpID0+IHZvaWQsXG4gICAgaW5pdFNlbGVjdG9yPzogKGVsOiBFKSA9PiBFbGVtZW50XG4gICk6IHZvaWRcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hBbmRJbml0aWFsaXplKFxuICBzZWxlY3Rvcjogc3RyaW5nLFxuICBjYWxsYmFjazogKGVsOiBFbGVtZW50KSA9PiB2b2lkLFxuICBpbml0U2VsZWN0b3I/OiAoZWw6IEVsZW1lbnQpID0+IEVsZW1lbnRcbik6IHZvaWQge1xuICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNhbGxiYWNrIGNhbm5vdCBiZSB1bmRlZmluZWRcIilcbiAgfVxuXG4gIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpIGFzIE5vZGVMaXN0T2Y8RWxlbWVudD5cblxuICBmb3IgKGxldCBlIG9mIGVsZW1lbnRzKSB7XG5cbiAgICBsZXQgaW5pdEVsZW1lbnQ6IEVsZW1lbnQgPSBlXG5cbiAgICBpZiAoaW5pdFNlbGVjdG9yKSB7XG4gICAgICBpbml0RWxlbWVudCA9IGluaXRTZWxlY3RvcihlKVxuICAgIH1cblxuICAgIGlmIChpbml0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluaXRcIikgPT09IFwiYXV0b1wiKSB7XG4gICAgICBjYWxsYmFjayhlKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBudW1iZXIgd2hvc2UgdmFsdWUgaXMgbGltaXRlZCB0byB0aGUgZ2l2ZW4gcmFuZ2UuXG4gKlxuICogRXhhbXBsZTogbGltaXQgdGhlIG91dHB1dCBvZiB0aGlzIGNvbXB1dGF0aW9uIHRvIGJldHdlZW4gMCBhbmQgMjU1XG4gKiBVdGlscy5jbGFtcChudW1iZXIsIDAsIDI1NSlcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgVGhlIG51bWJlciB0byBjbGFtcFxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbiBUaGUgbG93ZXIgYm91bmRhcnkgb2YgdGhlIG91dHB1dCByYW5nZVxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgdXBwZXIgYm91bmRhcnkgb2YgdGhlIG91dHB1dCByYW5nZVxuICogQHJldHVybnMgQSBudW1iZXIgaW4gdGhlIHJhbmdlIFttaW4sIG1heF1cbiAqIEB0eXBlIE51bWJlclxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KVxufVxuXG4vKipcbiAqIEEgcG9seWZpbGwgZm9yIEV2ZW50LnByZXZlbnREZWZhdWx0KCkuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRoZSBldmVudCB0byBwcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGV2ZW50OiBFdmVudCkge1xuICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIH0gZWxzZSB7XG4gICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZVxuICB9XG59XG5cbi8qKlxuICogQSBwb2x5ZmlsbCBmb3IgTm9kZS5yZW1vdmUoKS5cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBub2RlIHRvIHJlbW92ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShub2RlOiBOb2RlKSB7XG4gIGlmICghbm9kZSB8fCAhbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbn1cblxuLyoqXG4gKiBBIHNpbXBsZSBwb2x5ZmlsbCBmb3IgdGhlIEFycmF5LmZpbmQoKSBtZXRob2QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBzZWFyY2ggaW4uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBleHByZXNzaW9uIC0gVGhlIGV4cHJlc3Npb24gdG8gZXZhbHVhdGUuIE11c3QgcmV0dXJuIHRydWUgaWYgdGhlIGVsZW1lbnQgbWF0Y2hlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmQ8VCA9IGFueT4oXG4gIGFycmF5OiBUW10gfCB7IGxlbmd0aDogbnVtYmVyLCBbaTogbnVtYmVyXTogVCB9LFxuICBleHByZXNzaW9uOiAoaXRlbTogVCkgPT4gYm9vbGVhblxuKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgaXRlbSA9IGFycmF5W2ldXG4gICAgaWYgKGV4cHJlc3Npb24oaXRlbSkgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBpdGVtXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIENoZWNrcyB0aGUgdXNlcmFnZW50IGFuZCByZXR1cm5zIHRoZSBNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXIgLyBFZGdlIHZlcnNpb24uXG4gKiBJZiBhbm90aGVyIGJyb3dzZXIgaXMgZGV0ZWN0ZWQgMCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVybmV0RXhwbG9yZXJPckVkZ2VWZXJzaW9uKHVzZXJBZ2VudDogc3RyaW5nID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAvLyBoYW5kbGUgSUUgYW5kIEVkZ2VcbiAgY29uc3QgaWVPckVkZ2UgPSB1c2VyQWdlbnQuc2VhcmNoKC9NU0lFIHxFZGdlWy9dLylcbiAgaWYgKGllT3JFZGdlID4gMCkge1xuICAgIHJldHVybiBwYXJzZUludCh1c2VyQWdlbnQuc3Vic3RyaW5nKGllT3JFZGdlICsgNSwgdXNlckFnZW50LmluZGV4T2YoXCIuXCIsIGllT3JFZGdlKSksIDEwKVxuICB9XG4gIC8vIGhhbmRsZSBJRTExXG4gIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIlRyaWRlbnQvXCIpID4gMCkge1xuICAgIGNvbnN0IHJ2ID0gdXNlckFnZW50LmluZGV4T2YoXCJydjpcIilcbiAgICByZXR1cm4gcGFyc2VJbnQodXNlckFnZW50LnN1YnN0cmluZyhydiArIDMsIHVzZXJBZ2VudC5pbmRleE9mKFwiLlwiLCBydikpLCAxMClcbiAgfVxuXG4gIHJldHVybiAwXG59XG5cbi8qKlxuICogVHJpZXMgdG8gbW92ZSBhIGNoaWxkIGVsZW1lbnQgdG8gdGhlIHRvcCBieSBzY3JvbGxpbmcgdGhlIHBhcmVudCBlbGVtZW50LCBpZiBpdCBpcyBub3QgYWxyZWFkeSBmdWxseSB2aXNpYmxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsSW50b1ZpZXcoY2hpbGQ6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IHBhcmVudCA9IGNoaWxkLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnRcbiAgY29uc3QgcGFyZW50UmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCBjaGlsZFJlY3QgPSBjaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCBpc0Z1bGx5VmlzaWJsZSA9IGNoaWxkUmVjdC50b3AgPj0gcGFyZW50UmVjdC50b3AgJiYgY2hpbGRSZWN0LmJvdHRvbSA8PSBwYXJlbnRSZWN0LnRvcCArIHBhcmVudC5jbGllbnRIZWlnaHRcblxuICBpZiAoIWlzRnVsbHlWaXNpYmxlKSB7XG4gICAgcGFyZW50LnNjcm9sbFRvcCA9IGNoaWxkUmVjdC50b3AgKyBwYXJlbnQuc2Nyb2xsVG9wIC0gcGFyZW50UmVjdC50b3BcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9
