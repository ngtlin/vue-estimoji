import DomElement from "../DomElement";
/**
 * Loader bar component
 */
declare class LoaderBar extends DomElement {
    private progressElement;
    private fileNameElement;
    private progressLabelElement;
    private totalProgressElement;
    private value;
    /**
     * Creates and initializes the LoaderBar component.
     * @param {Element} - The root element of the LoaderBar component.
     */
    constructor(element: Element);
    /**
     * Initializes the loader bar component.
     * @private
     */
    protected _initialize(): void;
    /**
     * Gets the current progress value in the range of 0..1.
     */
    get progress(): number;
    /**
     * Sets the current progress.
     * @param {number} - The progress in the range of 0..1.
     */
    set progress(val: number);
    /**
     * Gets the filename.
     * @returns {string} - The filename.
     */
    get filename(): string | undefined;
    /**
     * Sets the filename.
     */
    set filename(val: string | undefined);
    /**
     * Sets the file size label.
     */
    set fileSize(val: string);
}
export declare function init(): void;
export default LoaderBar;
