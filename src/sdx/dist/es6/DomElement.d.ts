/**
 * A wrapper class for DOM Elements.
 */
declare class DomElement<T extends Element = Element> {
    element: T;
    /**
     * Creates a new instance.
     * @param {Element} - The element to wrap.
     * @param {String} - The DOM element to create.
     */
    constructor(element: T | keyof ElementTagNameMap);
    /**
     * Adds the specified CSS class to the element.
     * @param {String} - The class name to add.
     * @return {DomElement} Returns the current instance for fluent chaining of calls.
     */
    addClass(name: string): this;
    /**
     * Removes the specified CSS class from the element.
     * @param {String} - The class name to remove.
     * @return {DomElement} Returns the current instance for fluent chaining of calls.
     */
    removeClass(name: string): this;
    hasClass(name: string): boolean;
    toggleClass(name: string): this;
    get classes(): DOMTokenList;
    setId(id: string): this;
    get innerText(): string;
    get innerHtml(): string;
    setHtml(value: string): this;
    getAttribute(name: string): string | null;
    setAttribute(name: string, value: string): this;
    /**
     * Registers an event listener.
     */
    addEventListener<T extends keyof HTMLElementEventMap>(type: T, listener: (e: Event) => void): void;
    /**
     * Unregisters an event listener on the component.
     */
    removeEventListener<T extends keyof HTMLElementEventMap>(type: T, listener: (e: Event) => void): void;
    appendChild(newChild: DomElement): this;
    prependChild(newChild: DomElement): this;
    insertBefore(newChild: DomElement): this;
    insertAfter(newChild: DomElement): this;
    removeChild(oldChild: DomElement): void;
    find(selectors: string): DomElement<Element> | undefined;
    wrapWithElement(wrapperElement: DomElement): this;
    dispatchEvent(eventName: string): void;
    css(property: string): string;
    /**
     * Removes all child nodes of the current DomElement.
     */
    empty(): void;
}
export default DomElement;
