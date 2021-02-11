/**
 * Calls the callback function when the document has been completely parsed.
 * @param {callback} value The callback function to execute.
 */
export declare function onDocumentReady(callback: (e?: Event) => void): void;
/**
 * Searches for elements with the given selector and calls the callback
 * function if the `data-init` attribute is present on the element.
 * @param {selector} value The query.
 * @param {callback} value The callback function to initialize the element.
 * @param {function} initSelector The inititalization element selector function.
 */
export declare function searchAndInitialize<K extends keyof HTMLElementTagNameMap>(selector: K, callback: (el: HTMLElementTagNameMap[K]) => void, initSelector?: (el: HTMLElementTagNameMap[K]) => Element): void;
export declare function searchAndInitialize<E extends Element>(selector: string, callback: (el: E) => void, initSelector?: (el: E) => Element): void;
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
export declare function clamp(value: number, min: number, max: number): number;
/**
 * A polyfill for Event.preventDefault().
 * @param {Event} event - The event to prevent the default action.
 */
export declare function preventDefault(event: Event): void;
/**
 * A polyfill for Node.remove().
 * @param {Node} node - The node to remove.
 */
export declare function remove(node: Node): void;
/**
 * A simple polyfill for the Array.find() method.
 * @param {Array} array - The array to search in.
 * @param {function} expression - The expression to evaluate. Must return true if the element matches.
 */
export declare function find<T = any>(array: T[] | {
    length: number;
    [i: number]: T;
}, expression: (item: T) => boolean): T | undefined;
/**
 * Checks the useragent and returns the Microsoft Internet Explorer / Edge version.
 * If another browser is detected 0 is returned.
 */
export declare function internetExplorerOrEdgeVersion(userAgent?: string): number;
/**
 * Tries to move a child element to the top by scrolling the parent element, if it is not already fully visible.
 */
export declare function scrollIntoView(child: HTMLElement): void;
