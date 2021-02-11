import DomElement from "../DomElement";
/**
 * Textarea component
 */
declare class Textarea extends DomElement {
    private _area;
    private _focusChangedHandler;
    private _valueChangedHandler;
    private _resizeHandler;
    private _minRows;
    private _maxRows;
    private _lineHeight;
    private _updateBaseHeight;
    private _baseHeight;
    private _baseScrollHeight;
    constructor(element: Element);
    /**
     * Initializes the textarea component.
     * @private
     */
    protected _initialize(): void;
    protected _calculateBaseHeight(): void;
    protected _focusChanged(): void;
    protected _updateHeight(): void;
    protected _hasValue(): boolean | "";
    protected _onValueChanged(): void;
    /**
     * Destroys the component and clears all references.
     */
    destroy(): void;
}
export declare function init(): void;
export default Textarea;
