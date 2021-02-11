import DomElement from "../DomElement";
/**
 * Empty state pattern
 */
declare class EmptyState extends DomElement {
    private _border;
    private _fileInput;
    private _button;
    private _dragArea;
    private _fileChangedHandler;
    private _preventEventsHandler;
    private _dragEnterHandler;
    private _dragLeaveHandler;
    private _dropHandler;
    private _isDragging;
    /**
     * Creates and initializes the Empty-State pattern component.
     * @param {DomElement} - root element of the empty-state pattern.
     */
    constructor(element: Element);
    protected _initialize(): void;
    protected _preventDragEvents(e: Event): boolean;
    protected _handleDragEnter(): void;
    protected _handleDragLeave(): void;
    protected _handleDrop(e: Event): void;
    protected _handleFileChanged(): void;
    /**
     * Gets the currently selected files.
     */
    get files(): FileList | null;
}
export declare function init(): void;
export default EmptyState;
