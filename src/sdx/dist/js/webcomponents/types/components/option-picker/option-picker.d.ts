import { Option } from "./types";
export declare class OptionPicker {
    el: HTMLSdxOptionPickerElement;
    private optionsState;
    /**
     * List of selectable options.
     */
    options: Option[] | string;
    /**
     * Callback when the checking an option.
     */
    changeCallback: ((selection: any[]) => void) | string | undefined;
    /**
     * Enable multi select.
     */
    multiple: boolean;
    optionsChanged(): void;
    componentWillLoad(): void;
    render(): any;
}
