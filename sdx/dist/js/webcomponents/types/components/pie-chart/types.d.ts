import { Colors } from "../../core/variables/colors";
/**
 * The data point to be displayed in the chart. Please choose accent colors only, in this order:
 * "azure",
 * "turquoise",
 * "iris",
 * "orchid",
 * "pink".
 * If you have empty values, like "Available", just omit the color property.
 */
export declare type PieChartDataPoint = {
    value: number;
    color?: keyof Colors;
    label?: string;
    srHint?: string;
};
