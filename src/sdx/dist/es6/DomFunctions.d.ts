export declare function addClass(element: Element, name: string): void;
export declare function removeClass(element: Element, name: string): void;
export declare function hasClass(element: Element, name: string): boolean;
export declare function toggleClass(element: Element, name: string): void;
/**
 * Determines if the given element is hidden from view.
 * @param {Element} Element The dom element to check.
 * @param {boolean} includeParents If set to `true` searches up the DOM and checks parent visibility as well. Defaults to `false`.
 */
export declare function isHidden(element: HTMLElement, includeParents?: boolean): boolean;
/**
 * Gets the text of an element an makes sure this works on all browsers.
 */
export declare function text(element: Element): string;
export declare function parentWithClass<E extends Element = Element>(element: E, className: string): E | undefined;
export declare function textWidth(text: string, font: string): number;
export declare function css(element: Element, property: string): string;
/**
 * Gets the single element referenced in an items data-* attribute.
 * @param {DomElement} element - The element containing the reference attribute.
 * @param {string} attribute - The name of the reference attribute.
 * @returns {DomElement} The referenced element; or `undefined` if the reference is invalid
 * or the attribute could not be found.
 */
export declare function getAttributeReference<I extends Element = Element, O extends Element = I>(element: I, attribute: string): O | null | undefined;
/**
 * Gets the document root element (normally the body element)
 * If the document uses a sdx-container wrapper this is returned instead.
 * @returns {Element} The root dom element.
 */
export declare function getRootElement(): Element;
/**
 * Removes all child nodes from the provided element.
 * @param {Element} element The Dom element
 */
export declare function empty(element: Element): void;
