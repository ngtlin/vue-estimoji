import { Status, StepPosition } from "../types";
export declare class ProgressFullStep {
    private invokeStepClickCallback;
    el: HTMLSdxProgressFullStepElement;
    /**
     * @private
     */
    value: number;
    /**
     * @private
     */
    status: Status;
    /**
     * @private
     */
    position: StepPosition;
    /**
     * Triggered when a user clicks on the button or description of a completed step.
     */
    stepClickCallback?: (() => void) | string;
    stepClickCallbackChanged(): void;
    componentWillLoad(): void;
    /**
     * Trigger click event when completed.
     */
    private clicked;
    private setInvokeStepClickCallback;
    render(): any;
}
