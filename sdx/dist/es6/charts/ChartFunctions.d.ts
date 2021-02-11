export interface ChartLabel {
    title: string;
    color: string;
}
export interface ChartAxis extends ChartLabel {
    value: number;
}
export declare type ChartData = ChartAxis[];
export declare function tryGetData(element: HTMLElement): ChartData;
export declare function removeAllChildren(node: Node): void;
export declare function createLegendItem(data: ChartLabel): HTMLLIElement;
export declare function isColor(str: string): boolean;
