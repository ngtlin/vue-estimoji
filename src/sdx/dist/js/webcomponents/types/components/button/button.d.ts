import { BackgroundTheme, ButtonTheme } from "../../core/types/types";
import { Size } from "../icon/types";
import { ButtonType } from "./types";
export declare class Button {
    /**
     * Button theme. For further information about the different themes, see designers' section: https://sdx.swisscom.ch/components_-_buttons.html#design
     */
    theme: ButtonTheme;
    /**
     * Background theme. Use "dark" to make button colorless, whenever it is used on a colored or dark background (single color or image).
     */
    background: BackgroundTheme;
    /**
     * Button disabled.
     */
    disabled: boolean;
    /**
     * "href" when used as a link looking like a button.
     */
    href: string;
    /**
     * "target" when used as a link looking like a button.
     */
    target?: string;
    /**
     * Button text.
     */
    label: string;
    /**
     * Which icon to display.
     */
    iconName: string;
    /**
     * Size of the displayed icon. Can only be modified when theme="transparent". Font-size will be adjusted automatically.
     */
    iconSize: Size;
    /**
     * Description text read by the screen reader. Will be appended to the button content.
     */
    srHint: string;
    /**
     * Value for aria-expanded that will be applied to the button element. Used for buttons
     * that trigger expanding/collapsing such as an accordion, dropdown menu or tooltip.
     */
    ariaExpandedOnButton?: boolean;
    /**
     * Button type.
     */
    type: ButtonType;
    /**
     * @private
     * only used for icon-buttons within input fields such as numeric stepper, search, select, datepicker etc.
     */
    valid?: boolean;
    onTouchStart(): void;
    private getHostClassNames;
    private getComponentClassNames;
    private getAriaExpanded;
    private getIconSize;
    render(): any;
}
