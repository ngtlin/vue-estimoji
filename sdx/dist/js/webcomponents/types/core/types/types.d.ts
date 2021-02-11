/**
 * Background color scheme.
 */
export declare type BackgroundTheme = "light" | "dark";
/**
 * Mirror directions.
 */
export declare type FlipDirection = "none" | "horizontal" | "vertical" | "both";
/**
 * Button theme.
 */
export declare type ButtonTheme = "primary" | "secondary" | "confirm" | "transparent";
/**
 * Display state.
 */
export declare type Display = "open" | "opening" | "closed" | "closing";
/**
 * Stencil JSX compatible CSS rules.
 */
export declare type CSSRules = {
    [key: string]: string | undefined;
};
/**
 * Dictionary for typed lookups.
 */
export declare type Dictionary<T = any> = {
    [index: string]: T;
};
