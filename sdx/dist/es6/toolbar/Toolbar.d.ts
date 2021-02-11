import DomElement from "../DomElement";
/**
 * Toolbar component. Use this component to show and hide the
 * individual toolbar items.
 */
declare class Toolbar extends DomElement {
    /**
     * Makes the toolbar items visible.
     */
    show(): void;
    /**
     * Hides the toolbar items.
     */
    hide(): void;
    /**
     * Toggles the toolbar items visibility.
     */
    toggle(): void;
}
export default Toolbar;
