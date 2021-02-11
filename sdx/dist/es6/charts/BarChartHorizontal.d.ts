import DomElement from "../DomElement";
import { ChartData, ChartAxis } from "./ChartFunctions";
/**
 * Bar Chart Horizontal Component.
 */
declare class BarChartHorizontal extends DomElement<HTMLElement> {
    private _data;
    private _legendItems;
    private _progessWrapper;
    private _unit;
    private _maxValue;
    private _precision;
    private _isUnlimited;
    private _isLimited;
    private _detailRight;
    private _legend;
    /**
     * Creates and initializes the bar chart horizontal component.
     * @param {DomElement} - root element of the chart.
     */
    constructor(element: HTMLElement, data?: ChartData);
    protected _initialize(): void;
    protected _render(): void;
    private _animateValueElement;
    private _animateIndicator;
    private _animateLegend;
    protected _createValueElement(data: {
        value: number | string;
    }): HTMLElement;
    protected _addIndicator(data: ChartAxis, tooltip?: string): HTMLElement;
    protected _getTooltipContent(dataList: ChartData): string;
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
export default BarChartHorizontal;
