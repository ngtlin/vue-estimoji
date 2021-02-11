import DomElement from "../DomElement";
export interface Comparer<T = any> {
    (item1: T, item2: T): number;
}
/**
 * The Table component. Adds additional capabilities to standard HTML 5 tables.
 */
declare class Table extends DomElement {
    private _headerClickHandler;
    private _body;
    private _rows;
    /**
     * Creates a new instance of the table component.
     */
    constructor(element: HTMLTableElement);
    protected _initialize(): void;
    protected _handleHeaderClick(e: Event): void;
    /**
     * Sorts the table according to the specified table header element.
     * The column is sorted ascending by default if no direction is specified and no
     * existing sort order class is found in the markup.
     *
     * If the displayed data is not suitable for sorting `<td/>` elements can define a `data-value` attribute
     * which is then used for the data-source.
     *
     * @param {TableHeader} tableHeader The header element of the row to sort by.
     * @param {Number} direction The direction to sort, `1` for ascending, `-1` for descending order. This parameter is optional.
     * @param {function} equalityComparer The equiality comparer function to compare individual cell values.
     */
    sort(tableHeader: HTMLTableHeaderCellElement, direction?: -1 | 1, equalityComparer?: Comparer): void;
    protected _getCell(column: number, row: number): HTMLTableDataCellElement | HTMLTableHeaderCellElement;
    protected _getRow(row: number): HTMLTableRowElement;
    protected _getComparer(dataType: string): Comparer<string>;
    protected _quicksort(column: number, left: number, right: number, direction: 1 | -1 | undefined, equalityComparer: Comparer<string>): void;
    protected _partition(column: number, left: number, right: number, direction: 1 | -1 | undefined, equalityComparer: Comparer<string>): number;
    protected _equals(a: HTMLElement, b: HTMLElement, equalityComparer: Comparer<string>): number;
    protected _swap(i: number, j: number): void;
    /**
     * Destroys the component and clears all references.
     */
    destroy(): void;
}
export declare function init(): void;
export default Table;
