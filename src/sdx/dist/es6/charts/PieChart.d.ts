import DomElement from "../DomElement";
import { ChartData } from "./ChartFunctions";
/**
 * Pie Chart Component.
 */
declare class PieChart extends DomElement<HTMLElement> {
    private _data;
    private _chart;
    private _legend;
    private _title;
    private _subtitle;
    private _unit;
    private _alwaysShowLegend;
    /**
     * Creates and initializes the Pie Chart component.
     * @param {DomElement} - root element of the chart.
     * @param {Array} - pie chart data definitions.
     */
    constructor(element: HTMLElement, data?: ChartData);
    protected _initialize(): void;
    protected _render(): void;
    private _animateLegend;
    /**
     * Updates the pie chart with the specified data definitions.
     * @param {Array} - pie chart data definitions.
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
export default PieChart;
