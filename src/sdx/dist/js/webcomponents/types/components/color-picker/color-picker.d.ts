import { Color } from "./types";
export declare class ColorPicker {
    el: HTMLSdxOptionPickerElement;
    private colorsState;
    /**
     * List of selectable colors.
     */
    colors: Color[] | string;
    /**
     * Callback when the checking an option.
     */
    changeCallback: ((selection: string[]) => void) | string | undefined;
    /**
     * Enable multi select.
     */
    multiple: boolean;
    colorsChanged(): void;
    componentWillLoad(): void;
    render(): any;
}
