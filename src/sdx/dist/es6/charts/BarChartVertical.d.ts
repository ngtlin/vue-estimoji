import DomElement from "../DomElement";
import { ChartLabel } from "./ChartFunctions";
export interface Category extends ChartLabel {
}
export interface DataEntry {
    title: string;
    class: string;
    values: number[];
}
export interface ChartData {
    categories: Category[];
    items: DataEntry[];
}
/**
 * Bar Chart Horizontal Component.
 */
declare class BarChartVertical extends DomElement<HTMLElement> {
    private _data;
    private _unit;
    private _maxValue;
    private _chart;
    private _legend;
    /**
     * Creates and initializes the bar chart horizontal component.
     * @param element - root element of the chart.
     * @param data - data for the chart.
     */
    constructor(element: HTMLElement, data?: ChartData);
    protected _initialize(): void;
    protected _tryGetData(element: HTMLElement): ChartData;
    protected _getTooltipContent(entry: DataEntry, categories: Category[]): string;
    protected _render(): void;
    private _animateBars;
    private _animateLegend;
    /**
     * Updates the bar chart with the specified data definitions.
     * @param {Array} - bar chart data definitions.
     */
    update(data: ChartData): void;
    /**
     * Removes all event handlers and clears references.
     */
    destroy(): void;
    /**
     * @deprecated use destroy() instead.
     * @todo remove in version 2.0.0
     */
    destory(): void;
}
export declare function init(): void;
export default BarChartVertical;
