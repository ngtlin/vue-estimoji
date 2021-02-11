import { PieChartDataPoint } from "./types";
import { BackgroundTheme } from "../../core/types/types";
export declare class PieChart {
    private readonly viewBox;
    private readonly radius;
    private readonly segmentPaddingForSizeSmall;
    private readonly segmentPaddingForSizeMedium;
    private readonly hundredPercent;
    private readonly animationDuration;
    /**
     * The values to display.
     */
    data: PieChartDataPoint[] | string;
    /**
     * Text that contains the relevant information (e.g. "100 %").
     * It will be displayed in the center of the chart.
     */
    value: string;
    /**
     * Description text of what is displayed (e.g. "Storage" or "Available").
     * This does not appear in the "small" version.
     */
    description?: string;
    /**
     * Where to render the labels.
     */
    legendPosition: "bottom" | "right";
    /**
     * Dimension of the chart.
     */
    size: "small" | "medium";
    /**
     * Background color scheme.
     */
    backgroundTheme: BackgroundTheme;
    dataState: PieChartDataPoint[];
    dataChanged(): void;
    componentWillLoad(): void;
    private animateSegment;
    private animateLegendItem;
    /**
     * Read the data and create a pie part (segment) for every data point.
     * The SDX pie chart is special in two ways:
     * 1. it has a spacing between the segments (called segmentPadding)
     * 2. small values (values smaller than the segmentPadding) are represented by only a dot.
     *    This makes the math behind *special*, for example:
     *    If a chart has the values [1, 1, 1, 1000], the three "1" use up much more space than
     *    they would in an ordinary pie chart (where they would be hardly recognizable).
     *    This limits the amount of data segments (e.g. [1 * 50, 1000] ends up glitchy).
     */
    private dataToSegments;
    private widthToDeg;
    private getComponentClassNames;
    private hasLabelsOrSrHints;
    private hasLabelOrSrHint;
    private getSegmentColor;
    render(): any;
}
