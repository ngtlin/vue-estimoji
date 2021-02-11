import DomElement from "../DomElement";
/**
 * Notification component.
 * @namespace Notification
 */
/**
 * The message click callback function.
 * @memberof Notification
 * @callback Notification~Click
 * @property {NotificationHeader} item - The current notification header instance.
 * @returns {boolean} Return true if the notification should be closed; return false if the
 *                    notification should remain open.
 */
export interface MessageClickCallback {
    (header: NotificationHeader): boolean | undefined;
}
/**
 * The cancel callback function.
 * @memberof Notification
 * @callback Notification~Cancel
 * @property {NotificationHeader} item - The current notification header instance.
 */
export interface CancelCallback {
    (header: NotificationHeader): void;
}
/**
 * Creates and shows a notification with the specified message.
 * @memberof Notification
 * @param {String} containerId - The id of the container on where to show the notification.
 * @param {String} message - The message to show.
 * @param {Notification~Click} messageClickCallback - The callback that gets called when the user clicks on the notification message text.
 * @param {Notification~Cancel} cancelCallback - The callback that gets called when the user cancels the notification by closing it.
 * @param {String} modifierClass - The css modifier class for the notification; this is an optional parameter
 * @returns {NotificationHeader} The notification header item instance.
 */
export declare function showOnHeader(containerId: string, message: string, messageClickCallback?: MessageClickCallback, cancelCallback?: CancelCallback, modifierClass?: string): NotificationHeader;
/**
 * A component for displaying notifications on the page-header.
 * @inner
 * @memberof Notification
 */
export declare class NotificationHeader extends DomElement {
    private _closeHandler;
    private _clickHandler;
    private _callback?;
    private _cancelCallback?;
    private _closeButton;
    private _notificationBody;
    constructor();
    /**
     * Initializes the range modal component.
     * @private
     */
    protected _initialize(): void;
    protected _handleClick(event: Event): void;
    protected _handleClose(event: Event): void;
    protected _close(): void;
    _open(): void;
    set messageClickCallback(callback: MessageClickCallback | undefined);
    /**
     * Sets the cancel callback function.
     * @param {function} - The callback function to call.
     */
    set cancelCallback(callback: CancelCallback | undefined);
    /**
     * Sets the notification message.
     * @param {String} - The message to set.
     */
    set message(value: string);
    /**
     * Closes the notification.
     */
    close(): void;
}
