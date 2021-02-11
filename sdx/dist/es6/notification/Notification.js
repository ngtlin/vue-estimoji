import { __extends } from "tslib";
import { preventDefault } from "../Utils";
import DomElement from "../DomElement";
var CLASS_NOTIFICATION = "notification-header";
var CLASS_OPEN = "notification--open";
var CLASS_BUTTON_CLOSE = "notification__close";
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
export function showOnHeader(containerId, message, messageClickCallback, cancelCallback, modifierClass) {
    var containerE = document.querySelector("#" + containerId);
    if (!containerE) {
        throw new Error("Could not find the container with id " + containerId);
    }
    var containerElement = new DomElement(containerE);
    var notificationElement = new NotificationHeader();
    if (modifierClass) {
        notificationElement.addClass(modifierClass);
    }
    notificationElement.message = message;
    notificationElement.messageClickCallback = messageClickCallback;
    notificationElement.cancelCallback = cancelCallback;
    containerElement.appendChild(notificationElement);
    notificationElement._open();
    return notificationElement;
}
/**
 * A component for displaying notifications on the page-header.
 * @inner
 * @memberof Notification
 */
var NotificationHeader = /** @class */ (function (_super) {
    __extends(NotificationHeader, _super);
    function NotificationHeader() {
        var _this = _super.call(this, "div") || this;
        _this._closeHandler = _this._handleClose.bind(_this);
        _this._clickHandler = _this._handleClick.bind(_this);
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the range modal component.
     * @private
     */
    NotificationHeader.prototype._initialize = function () {
        this.addClass(CLASS_NOTIFICATION);
        this.addClass(CLASS_OPEN);
        var notificationContent = new DomElement("div")
            .addClass("notification__content");
        this.appendChild(notificationContent);
        this._notificationBody = new DomElement("div")
            .addClass("notification__body");
        notificationContent.appendChild(this._notificationBody);
        this._closeButton = new DomElement("button")
            .addClass(CLASS_BUTTON_CLOSE)
            .addClass("notification-cancel")
            .setAttribute("aria-label", "Close");
        var closeIcon = new DomElement("i")
            .addClass("icon")
            .addClass("icon-022-close")
            .setAttribute("aria-hidden", "true");
        this._closeButton.appendChild(closeIcon);
        notificationContent.appendChild(this._closeButton);
        this.element.addEventListener("click", this._clickHandler);
    };
    NotificationHeader.prototype._handleClick = function (event) {
        preventDefault(event);
        var closeNotification = true;
        if (this._callback) {
            if (this._callback(this) === false) {
                closeNotification = false;
            }
        }
        if (closeNotification === true) {
            this.close();
        }
    };
    NotificationHeader.prototype._handleClose = function (event) {
        preventDefault(event);
        event.stopPropagation();
        if (this._cancelCallback) {
            this._cancelCallback(this);
        }
        this.close();
    };
    NotificationHeader.prototype._close = function () {
        this.removeClass(CLASS_OPEN);
        this._closeButton.element.removeEventListener("click", this._closeHandler);
        var el = this.element;
        setTimeout(function () {
            // remove the element from the dom
            if (el && el.parentElement) {
                el.parentElement.removeChild(el);
            }
        }, 300);
    };
    // called by showOnHeader
    NotificationHeader.prototype._open = function () {
        this.addClass(CLASS_OPEN);
        this._closeButton.element.addEventListener("click", this._closeHandler);
        this.dispatchEvent("opened");
    };
    Object.defineProperty(NotificationHeader.prototype, "messageClickCallback", {
        set: function (callback) {
            this._callback = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NotificationHeader.prototype, "cancelCallback", {
        /**
         * Sets the cancel callback function.
         * @param {function} - The callback function to call.
         */
        set: function (callback) {
            this._cancelCallback = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NotificationHeader.prototype, "message", {
        /**
         * Sets the notification message.
         * @param {String} - The message to set.
         */
        set: function (value) {
            this._notificationBody.setHtml(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Closes the notification.
     */
    NotificationHeader.prototype.close = function () {
        this._close();
        this.dispatchEvent("closed");
    };
    return NotificationHeader;
}(DomElement));
export { NotificationHeader };

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL25vdGlmaWNhdGlvbi9Ob3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDekMsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFBO0FBRXRDLElBQU0sa0JBQWtCLEdBQUcscUJBQXFCLENBQUE7QUFFaEQsSUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUE7QUFDdkMsSUFBTSxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQTtBQTZCaEQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FDMUIsV0FBbUIsRUFDbkIsT0FBZSxFQUNmLG9CQUEyQyxFQUMzQyxjQUErQixFQUMvQixhQUFzQjtJQUd0QixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQUksV0FBYSxDQUFDLENBQUE7SUFDNUQsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQXdDLFdBQWEsQ0FBQyxDQUFBO0tBQ3ZFO0lBRUQsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNuRCxJQUFNLG1CQUFtQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQTtJQUVwRCxJQUFJLGFBQWEsRUFBRTtRQUNqQixtQkFBbUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUE7S0FDNUM7SUFFRCxtQkFBbUIsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0lBQ3JDLG1CQUFtQixDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFBO0lBQy9ELG1CQUFtQixDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7SUFFbkQsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDakQsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUE7SUFFM0IsT0FBTyxtQkFBbUIsQ0FBQTtBQUM1QixDQUFDO0FB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Q0FBQztZQUNULGtDQUFrQztZQUNsQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFO2dCQUMxQixFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNqQztRQUNILENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNULENBQUM7SUFFRCx5QkFBeUI7SUFDbEIsa0NBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN2RSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFFRCxzQkFBSSxvREFBb0I7YUFBeEIsVUFBeUIsUUFBMEM7WUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7UUFDM0IsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSw4Q0FBYztRQUpsQjs7O1dBR0c7YUFDSCxVQUFtQixRQUFvQztZQUNyRCxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQTtRQUNqQyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLHVDQUFPO1FBSlg7OztXQUdHO2FBQ0gsVUFBWSxLQUFhO1lBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRztJQUNJLGtDQUFLLEdBQVo7UUFDRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFDSCx5QkFBQztBQUFELENBL0hBLEFBK0hDLENBL0h1QyxVQUFVLEdBK0hqRCIsImZpbGUiOiJtYWluL3NyYy9ub3RpZmljYXRpb24vTm90aWZpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJldmVudERlZmF1bHQgfSBmcm9tIFwiLi4vVXRpbHNcIlxuaW1wb3J0IERvbUVsZW1lbnQgZnJvbSBcIi4uL0RvbUVsZW1lbnRcIlxuXG5jb25zdCBDTEFTU19OT1RJRklDQVRJT04gPSBcIm5vdGlmaWNhdGlvbi1oZWFkZXJcIlxuXG5jb25zdCBDTEFTU19PUEVOID0gXCJub3RpZmljYXRpb24tLW9wZW5cIlxuY29uc3QgQ0xBU1NfQlVUVE9OX0NMT1NFID0gXCJub3RpZmljYXRpb25fX2Nsb3NlXCJcblxuLyoqXG4gKiBOb3RpZmljYXRpb24gY29tcG9uZW50LlxuICogQG5hbWVzcGFjZSBOb3RpZmljYXRpb25cbiAqL1xuXG4vKipcbiAqIFRoZSBtZXNzYWdlIGNsaWNrIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICogQGNhbGxiYWNrIE5vdGlmaWNhdGlvbn5DbGlja1xuICogQHByb3BlcnR5IHtOb3RpZmljYXRpb25IZWFkZXJ9IGl0ZW0gLSBUaGUgY3VycmVudCBub3RpZmljYXRpb24gaGVhZGVyIGluc3RhbmNlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBub3RpZmljYXRpb24gc2hvdWxkIGJlIGNsb3NlZDsgcmV0dXJuIGZhbHNlIGlmIHRoZVxuICogICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbiBzaG91bGQgcmVtYWluIG9wZW4uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUNsaWNrQ2FsbGJhY2sge1xuICAoaGVhZGVyOiBOb3RpZmljYXRpb25IZWFkZXIpOiBib29sZWFuIHwgdW5kZWZpbmVkXG59XG5cbi8qKlxuICogVGhlIGNhbmNlbCBjYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAqIEBjYWxsYmFjayBOb3RpZmljYXRpb25+Q2FuY2VsXG4gKiBAcHJvcGVydHkge05vdGlmaWNhdGlvbkhlYWRlcn0gaXRlbSAtIFRoZSBjdXJyZW50IG5vdGlmaWNhdGlvbiBoZWFkZXIgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2FuY2VsQ2FsbGJhY2sge1xuICAoaGVhZGVyOiBOb3RpZmljYXRpb25IZWFkZXIpOiB2b2lkXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgc2hvd3MgYSBub3RpZmljYXRpb24gd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UuXG4gKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gY29udGFpbmVySWQgLSBUaGUgaWQgb2YgdGhlIGNvbnRhaW5lciBvbiB3aGVyZSB0byBzaG93IHRoZSBub3RpZmljYXRpb24uXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNob3cuXG4gKiBAcGFyYW0ge05vdGlmaWNhdGlvbn5DbGlja30gbWVzc2FnZUNsaWNrQ2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCBnZXRzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbm90aWZpY2F0aW9uIG1lc3NhZ2UgdGV4dC5cbiAqIEBwYXJhbSB7Tm90aWZpY2F0aW9ufkNhbmNlbH0gY2FuY2VsQ2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCBnZXRzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGNhbmNlbHMgdGhlIG5vdGlmaWNhdGlvbiBieSBjbG9zaW5nIGl0LlxuICogQHBhcmFtIHtTdHJpbmd9IG1vZGlmaWVyQ2xhc3MgLSBUaGUgY3NzIG1vZGlmaWVyIGNsYXNzIGZvciB0aGUgbm90aWZpY2F0aW9uOyB0aGlzIGlzIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxuICogQHJldHVybnMge05vdGlmaWNhdGlvbkhlYWRlcn0gVGhlIG5vdGlmaWNhdGlvbiBoZWFkZXIgaXRlbSBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dPbkhlYWRlcihcbiAgY29udGFpbmVySWQ6IHN0cmluZyxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICBtZXNzYWdlQ2xpY2tDYWxsYmFjaz86IE1lc3NhZ2VDbGlja0NhbGxiYWNrLFxuICBjYW5jZWxDYWxsYmFjaz86IENhbmNlbENhbGxiYWNrLFxuICBtb2RpZmllckNsYXNzPzogc3RyaW5nXG4pIHtcblxuICBjb25zdCBjb250YWluZXJFID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29udGFpbmVySWR9YClcbiAgaWYgKCFjb250YWluZXJFKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0aGUgY29udGFpbmVyIHdpdGggaWQgJHtjb250YWluZXJJZH1gKVxuICB9XG5cbiAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IG5ldyBEb21FbGVtZW50KGNvbnRhaW5lckUpXG4gIGNvbnN0IG5vdGlmaWNhdGlvbkVsZW1lbnQgPSBuZXcgTm90aWZpY2F0aW9uSGVhZGVyKClcblxuICBpZiAobW9kaWZpZXJDbGFzcykge1xuICAgIG5vdGlmaWNhdGlvbkVsZW1lbnQuYWRkQ2xhc3MobW9kaWZpZXJDbGFzcylcbiAgfVxuXG4gIG5vdGlmaWNhdGlvbkVsZW1lbnQubWVzc2FnZSA9IG1lc3NhZ2VcbiAgbm90aWZpY2F0aW9uRWxlbWVudC5tZXNzYWdlQ2xpY2tDYWxsYmFjayA9IG1lc3NhZ2VDbGlja0NhbGxiYWNrXG4gIG5vdGlmaWNhdGlvbkVsZW1lbnQuY2FuY2VsQ2FsbGJhY2sgPSBjYW5jZWxDYWxsYmFja1xuXG4gIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uRWxlbWVudClcbiAgbm90aWZpY2F0aW9uRWxlbWVudC5fb3BlbigpXG5cbiAgcmV0dXJuIG5vdGlmaWNhdGlvbkVsZW1lbnRcbn1cblxuLyoqXG4gKiBBIGNvbXBvbmVudCBmb3IgZGlzcGxheWluZyBub3RpZmljYXRpb25zIG9uIHRoZSBwYWdlLWhlYWRlci5cbiAqIEBpbm5lclxuICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICovXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uSGVhZGVyIGV4dGVuZHMgRG9tRWxlbWVudCB7XG4gIHByaXZhdGUgX2Nsb3NlSGFuZGxlcjogKGV2ZW50OiBFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9jbGlja0hhbmRsZXI6IChldmVudDogRXZlbnQpID0+IHZvaWRcblxuICBwcml2YXRlIF9jYWxsYmFjaz86IE1lc3NhZ2VDbGlja0NhbGxiYWNrXG4gIHByaXZhdGUgX2NhbmNlbENhbGxiYWNrPzogQ2FuY2VsQ2FsbGJhY2tcblxuICBwcml2YXRlIF9jbG9zZUJ1dHRvbiE6IERvbUVsZW1lbnQ8RWxlbWVudD5cbiAgcHJpdmF0ZSBfbm90aWZpY2F0aW9uQm9keSE6IERvbUVsZW1lbnQ8RWxlbWVudD5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcImRpdlwiKVxuXG4gICAgdGhpcy5fY2xvc2VIYW5kbGVyID0gdGhpcy5faGFuZGxlQ2xvc2UuYmluZCh0aGlzKVxuICAgIHRoaXMuX2NsaWNrSGFuZGxlciA9IHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcylcblxuICAgIHRoaXMuX2luaXRpYWxpemUoKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSByYW5nZSBtb2RhbCBjb21wb25lbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hZGRDbGFzcyhDTEFTU19OT1RJRklDQVRJT04pXG4gICAgdGhpcy5hZGRDbGFzcyhDTEFTU19PUEVOKVxuXG4gICAgY29uc3Qgbm90aWZpY2F0aW9uQ29udGVudCA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAuYWRkQ2xhc3MoXCJub3RpZmljYXRpb25fX2NvbnRlbnRcIilcblxuICAgIHRoaXMuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uQ29udGVudClcblxuICAgIHRoaXMuX25vdGlmaWNhdGlvbkJvZHkgPSBuZXcgRG9tRWxlbWVudChcImRpdlwiKVxuICAgICAgLmFkZENsYXNzKFwibm90aWZpY2F0aW9uX19ib2R5XCIpXG5cbiAgICBub3RpZmljYXRpb25Db250ZW50LmFwcGVuZENoaWxkKHRoaXMuX25vdGlmaWNhdGlvbkJvZHkpXG5cbiAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IG5ldyBEb21FbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NfQlVUVE9OX0NMT1NFKVxuICAgICAgLmFkZENsYXNzKFwibm90aWZpY2F0aW9uLWNhbmNlbFwiKVxuICAgICAgLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJDbG9zZVwiKVxuXG4gICAgY29uc3QgY2xvc2VJY29uID0gbmV3IERvbUVsZW1lbnQoXCJpXCIpXG4gICAgICAuYWRkQ2xhc3MoXCJpY29uXCIpXG4gICAgICAuYWRkQ2xhc3MoXCJpY29uLTAyMi1jbG9zZVwiKVxuICAgICAgLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKVxuXG4gICAgdGhpcy5fY2xvc2VCdXR0b24uYXBwZW5kQ2hpbGQoY2xvc2VJY29uKVxuICAgIG5vdGlmaWNhdGlvbkNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2xvc2VCdXR0b24pXG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2NsaWNrSGFuZGxlcilcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgcHJldmVudERlZmF1bHQoZXZlbnQpXG5cbiAgICBsZXQgY2xvc2VOb3RpZmljYXRpb24gPSB0cnVlXG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICBpZiAodGhpcy5fY2FsbGJhY2sodGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGNsb3NlTm90aWZpY2F0aW9uID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2xvc2VOb3RpZmljYXRpb24gPT09IHRydWUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlQ2xvc2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgcHJldmVudERlZmF1bHQoZXZlbnQpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGlmICh0aGlzLl9jYW5jZWxDYWxsYmFjaykge1xuICAgICAgdGhpcy5fY2FuY2VsQ2FsbGJhY2sodGhpcylcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcyhDTEFTU19PUEVOKVxuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2Nsb3NlSGFuZGxlcilcblxuICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyByZW1vdmUgdGhlIGVsZW1lbnQgZnJvbSB0aGUgZG9tXG4gICAgICBpZiAoZWwgJiYgZWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICBlbC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsKVxuICAgICAgfVxuICAgIH0sIDMwMClcbiAgfVxuXG4gIC8vIGNhbGxlZCBieSBzaG93T25IZWFkZXJcbiAgcHVibGljIF9vcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoQ0xBU1NfT1BFTilcblxuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2Nsb3NlSGFuZGxlcilcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJvcGVuZWRcIilcbiAgfVxuXG4gIHNldCBtZXNzYWdlQ2xpY2tDYWxsYmFjayhjYWxsYmFjazogTWVzc2FnZUNsaWNrQ2FsbGJhY2sgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY2FuY2VsIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBjYWxsLlxuICAgKi9cbiAgc2V0IGNhbmNlbENhbGxiYWNrKGNhbGxiYWNrOiBDYW5jZWxDYWxsYmFjayB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2NhbmNlbENhbGxiYWNrID0gY2FsbGJhY2tcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBub3RpZmljYXRpb24gbWVzc2FnZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IC0gVGhlIG1lc3NhZ2UgdG8gc2V0LlxuICAgKi9cbiAgc2V0IG1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX25vdGlmaWNhdGlvbkJvZHkuc2V0SHRtbCh2YWx1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG5vdGlmaWNhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICB0aGlzLl9jbG9zZSgpXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFwiY2xvc2VkXCIpXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
