import DomElement from "../DomElement";
/**
 * A component to open and close modal dialogs. It also handles cancellation and makes
 * sure that the modal background is present in the DOM.
 */
declare class Modal extends DomElement<HTMLElement> {
    private _okayHandler;
    private _cancelHandler;
    private _keydownHandler;
    private _windowClickHandler?;
    private _triggerClickHandler?;
    private _backdrop;
    private _backdropParent;
    constructor(element: HTMLElement);
    /**
     * Initializes the range modal component.
     * @private
     */
    protected _initialize(): void;
    protected _subscribeToTrigger(): void;
    protected _unsubscribeFromTrigger(): void;
    protected _handleKeydown(event: Event): void;
    protected _handleClick(event: Event): void;
    protected _close(): void;
    /**
     * Opens the modal dialog.
     * @fires Modal#opened
     */
    open(): void;
    /**
     * Cancels (and closes) the modal dialog.
     * @fires Modal#cancelled
     * @fires Modal#closed
     */
    cancel(): void;
    /**
     * Closes the modal dialog.
     * @fires Modal#closed
     */
    close(): void;
    /**
     * Destroys the component and frees all references.
     */
    destroy(): void;
}
export declare function init(): void;
export default Modal;
