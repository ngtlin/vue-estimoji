import { __extends, __values } from "tslib";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { searchAndInitialize, preventDefault } from "../Utils";
import * as Inputs from "../Inputs";
import DomElement from "../DomElement";
import { getRootElement } from "../DomFunctions";
var CLASS_BACKDROP = "backdrop";
var CLASS_BACKDROP_OPEN = "backdrop--open";
var CLASS_OPEN = "modal--open";
var CLASS_TRIGGER = "modal-trigger";
var CLASS_BODY = "modal__body";
var CLASS_BUTTONS_OKAY = ".modal-close";
var CLASS_BUTTONS_CLOSE = ".modal-cancel";
/**
 * A component to open and close modal dialogs. It also handles cancellation and makes
 * sure that the modal background is present in the DOM.
 */
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(element) {
        var _this = _super.call(this, element) || this;
        _this._okayHandler = _this.close.bind(_this);
        _this._cancelHandler = _this._handleClick.bind(_this);
        _this._keydownHandler = _this._handleKeydown.bind(_this);
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the range modal component.
     * @private
     */
    Modal.prototype._initialize = function () {
        // Create the backdrop
        this._backdrop = new DomElement("div")
            .addClass(CLASS_BACKDROP);
        this._backdropParent = getRootElement();
        this._subscribeToTrigger();
    };
    Modal.prototype._subscribeToTrigger = function () {
        var e_1, _a;
        var triggerId = this.element.id;
        if (!triggerId) {
            return;
        }
        this._triggerClickHandler = this.open.bind(this);
        var triggerElements = document.querySelectorAll("." + CLASS_TRIGGER + "[href=" + triggerId + "]");
        try {
            for (var triggerElements_1 = __values(triggerElements), triggerElements_1_1 = triggerElements_1.next(); !triggerElements_1_1.done; triggerElements_1_1 = triggerElements_1.next()) {
                var triggerElement = triggerElements_1_1.value;
                triggerElement.addEventListener("click", this._triggerClickHandler);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (triggerElements_1_1 && !triggerElements_1_1.done && (_a = triggerElements_1.return)) _a.call(triggerElements_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Modal.prototype._unsubscribeFromTrigger = function () {
        var e_2, _a;
        var triggerId = this.element.id;
        if (!triggerId) {
            return;
        }
        var triggerElements = document.querySelectorAll("." + CLASS_TRIGGER + "[href=" + triggerId + "]");
        try {
            for (var triggerElements_2 = __values(triggerElements), triggerElements_2_1 = triggerElements_2.next(); !triggerElements_2_1.done; triggerElements_2_1 = triggerElements_2.next()) {
                var triggerElement = triggerElements_2_1.value;
                triggerElement.removeEventListener("click", this._windowClickHandler);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (triggerElements_2_1 && !triggerElements_2_1.done && (_a = triggerElements_2.return)) _a.call(triggerElements_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this._triggerClickHandler = undefined;
    };
    Modal.prototype._handleKeydown = function (event) {
        var keyboardEvent = event;
        var keycode = keyboardEvent.which || keyboardEvent.keyCode;
        if (keycode === Inputs.KEY_ESCAPE) {
            // handle Escape key (ESC)
            this.cancel();
            return;
        }
    };
    Modal.prototype._handleClick = function (event) {
        preventDefault(event);
        this.cancel();
    };
    Modal.prototype._close = function () {
        var e_3, _a, e_4, _b;
        var _this = this;
        enableBodyScroll(this.element);
        document.removeEventListener("keydown", this._keydownHandler);
        this._backdrop.element.removeEventListener("click", this._cancelHandler);
        this._backdrop.removeClass(CLASS_BACKDROP_OPEN);
        this.removeClass(CLASS_OPEN);
        try {
            for (var _c = __values(this.element.querySelectorAll(CLASS_BUTTONS_CLOSE)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var closeButton = _d.value;
                closeButton.removeEventListener("click", this._cancelHandler);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _e = __values(this.element.querySelectorAll(CLASS_BUTTONS_OKAY)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var okayButton = _f.value;
                okayButton.removeEventListener("click", this._okayHandler);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
        setTimeout(function () {
            // remove the backdrop from the body
            _this._backdropParent.removeChild(_this._backdrop.element);
        }, 300);
    };
    /**
     * Opens the modal dialog.
     * @fires Modal#opened
     */
    Modal.prototype.open = function () {
        var _this = this;
        disableBodyScroll(this.element, {
            allowTouchMove: function (el) {
                var currentEl = el;
                while (currentEl && currentEl !== document.body) {
                    // Check if the user is scrolling the modal body
                    if (currentEl.classList.contains(CLASS_BODY)) {
                        // Check if the element overflows
                        if (currentEl.scrollHeight > currentEl.clientHeight) {
                            return true;
                        }
                    }
                    currentEl = currentEl.parentNode;
                }
                return false;
            }
        });
        // add the backdrop to the body
        this._backdropParent.appendChild(this._backdrop.element);
        // set the element to flex as it is initially hidden
        this.element.style.display = "flex";
        // remove the style after the animation completes
        setTimeout(function () {
            _this.element.style.display = "";
        }, 800);
        // wait a bit to allow the browser to catch up and show the animation
        setTimeout(function () {
            var e_5, _a, e_6, _b;
            _this.addClass(CLASS_OPEN);
            _this._backdrop.addClass(CLASS_BACKDROP_OPEN);
            document.addEventListener("keydown", _this._keydownHandler);
            _this._backdrop.element.addEventListener("click", _this._cancelHandler);
            try {
                for (var _c = __values(_this.element.querySelectorAll(CLASS_BUTTONS_CLOSE)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var closeButton = _d.value;
                    closeButton.addEventListener("click", _this._cancelHandler);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            try {
                for (var _e = __values(_this.element.querySelectorAll(CLASS_BUTTONS_OKAY)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var okayButton = _f.value;
                    okayButton.addEventListener("click", _this._okayHandler);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_6) throw e_6.error; }
            }
            _this.element.addEventListener("click", function (e) { return e.stopPropagation(); });
            _this.dispatchEvent("opened");
        }, 50);
    };
    /**
     * Cancels (and closes) the modal dialog.
     * @fires Modal#cancelled
     * @fires Modal#closed
     */
    Modal.prototype.cancel = function () {
        this.dispatchEvent("cancelled");
        this._close();
    };
    /**
     * Closes the modal dialog.
     * @fires Modal#closed
     */
    Modal.prototype.close = function () {
        this._close();
        this.dispatchEvent("closed");
    };
    /**
     * Destroys the component and frees all references.
     */
    Modal.prototype.destroy = function () {
        this.cancel();
        this._unsubscribeFromTrigger();
    };
    return Modal;
}(DomElement));
export function init() {
    searchAndInitialize(".modal", function (e) {
        new Modal(e);
    });
}
export default Modal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxDQUFBO1lBRXpFLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDOUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQkFBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUJBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUJBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNiLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFBO0lBQ2hDLENBQUM7SUFzQkgsWUFBQztBQUFELENBL01BLEFBK01DLENBL01tQixVQUFVLEdBK003QjtBQUVELE1BQU0sVUFBVSxJQUFJO0lBQ2xCLG1CQUFtQixDQUFjLFFBQVEsRUFBRSxVQUFDLENBQUM7UUFDM0MsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDZCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxlQUFlLEtBQUssQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9tb2RhbC9Nb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRpc2FibGVCb2R5U2Nyb2xsLCBlbmFibGVCb2R5U2Nyb2xsIH0gZnJvbSBcImJvZHktc2Nyb2xsLWxvY2tcIlxuaW1wb3J0IHsgc2VhcmNoQW5kSW5pdGlhbGl6ZSwgcHJldmVudERlZmF1bHQgfSBmcm9tIFwiLi4vVXRpbHNcIlxuaW1wb3J0ICogYXMgSW5wdXRzIGZyb20gXCIuLi9JbnB1dHNcIlxuaW1wb3J0IERvbUVsZW1lbnQgZnJvbSBcIi4uL0RvbUVsZW1lbnRcIlxuaW1wb3J0IHsgZ2V0Um9vdEVsZW1lbnQgfSBmcm9tIFwiLi4vRG9tRnVuY3Rpb25zXCJcblxuY29uc3QgQ0xBU1NfQkFDS0RST1AgPSBcImJhY2tkcm9wXCJcbmNvbnN0IENMQVNTX0JBQ0tEUk9QX09QRU4gPSBcImJhY2tkcm9wLS1vcGVuXCJcblxuY29uc3QgQ0xBU1NfT1BFTiA9IFwibW9kYWwtLW9wZW5cIlxuY29uc3QgQ0xBU1NfVFJJR0dFUiA9IFwibW9kYWwtdHJpZ2dlclwiXG5cbmNvbnN0IENMQVNTX0JPRFkgPSBcIm1vZGFsX19ib2R5XCJcblxuY29uc3QgQ0xBU1NfQlVUVE9OU19PS0FZID0gXCIubW9kYWwtY2xvc2VcIlxuY29uc3QgQ0xBU1NfQlVUVE9OU19DTE9TRSA9IFwiLm1vZGFsLWNhbmNlbFwiXG5cbi8qKlxuICogQSBjb21wb25lbnQgdG8gb3BlbiBhbmQgY2xvc2UgbW9kYWwgZGlhbG9ncy4gSXQgYWxzbyBoYW5kbGVzIGNhbmNlbGxhdGlvbiBhbmQgbWFrZXNcbiAqIHN1cmUgdGhhdCB0aGUgbW9kYWwgYmFja2dyb3VuZCBpcyBwcmVzZW50IGluIHRoZSBET00uXG4gKi9cbmNsYXNzIE1vZGFsIGV4dGVuZHMgRG9tRWxlbWVudDxIVE1MRWxlbWVudD4ge1xuICBwcml2YXRlIF9va2F5SGFuZGxlcjogKGU6IEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX2NhbmNlbEhhbmRsZXI6IChlOiBFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9rZXlkb3duSGFuZGxlcjogKGU6IEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX3dpbmRvd0NsaWNrSGFuZGxlcj86IChlOiBFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF90cmlnZ2VyQ2xpY2tIYW5kbGVyPzogKGU6IEV2ZW50KSA9PiB2b2lkXG5cbiAgcHJpdmF0ZSBfYmFja2Ryb3AhOiBEb21FbGVtZW50PEhUTUxEaXZFbGVtZW50PlxuICBwcml2YXRlIF9iYWNrZHJvcFBhcmVudCE6IEVsZW1lbnRcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpXG5cbiAgICB0aGlzLl9va2F5SGFuZGxlciA9IHRoaXMuY2xvc2UuYmluZCh0aGlzKVxuICAgIHRoaXMuX2NhbmNlbEhhbmRsZXIgPSB0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpXG4gICAgdGhpcy5fa2V5ZG93bkhhbmRsZXIgPSB0aGlzLl9oYW5kbGVLZXlkb3duLmJpbmQodGhpcylcblxuICAgIHRoaXMuX2luaXRpYWxpemUoKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSByYW5nZSBtb2RhbCBjb21wb25lbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRpYWxpemUoKSB7XG5cbiAgICAvLyBDcmVhdGUgdGhlIGJhY2tkcm9wXG4gICAgdGhpcy5fYmFja2Ryb3AgPSBuZXcgRG9tRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIilcbiAgICAgIC5hZGRDbGFzcyhDTEFTU19CQUNLRFJPUClcblxuICAgIHRoaXMuX2JhY2tkcm9wUGFyZW50ID0gZ2V0Um9vdEVsZW1lbnQoKVxuICAgIHRoaXMuX3N1YnNjcmliZVRvVHJpZ2dlcigpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZVRvVHJpZ2dlcigpIHtcbiAgICBjb25zdCB0cmlnZ2VySWQgPSB0aGlzLmVsZW1lbnQuaWRcbiAgICBpZiAoIXRyaWdnZXJJZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fdHJpZ2dlckNsaWNrSGFuZGxlciA9IHRoaXMub3Blbi5iaW5kKHRoaXMpXG5cbiAgICBsZXQgdHJpZ2dlckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Q0xBU1NfVFJJR0dFUn1baHJlZj0ke3RyaWdnZXJJZH1dYClcbiAgICBmb3IgKGxldCB0cmlnZ2VyRWxlbWVudCBvZiB0cmlnZ2VyRWxlbWVudHMpIHtcbiAgICAgIHRyaWdnZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl90cmlnZ2VyQ2xpY2tIYW5kbGVyISlcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlRnJvbVRyaWdnZXIoKSB7XG4gICAgY29uc3QgdHJpZ2dlcklkID0gdGhpcy5lbGVtZW50LmlkXG4gICAgaWYgKCF0cmlnZ2VySWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCB0cmlnZ2VyRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtDTEFTU19UUklHR0VSfVtocmVmPSR7dHJpZ2dlcklkfV1gKVxuICAgIGZvciAobGV0IHRyaWdnZXJFbGVtZW50IG9mIHRyaWdnZXJFbGVtZW50cykge1xuICAgICAgdHJpZ2dlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlciEpXG4gICAgfVxuXG4gICAgdGhpcy5fdHJpZ2dlckNsaWNrSGFuZGxlciA9IHVuZGVmaW5lZFxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGtleWJvYXJkRXZlbnQgPSBldmVudCBhcyBLZXlib2FyZEV2ZW50XG4gICAgbGV0IGtleWNvZGUgPSBrZXlib2FyZEV2ZW50LndoaWNoIHx8IGtleWJvYXJkRXZlbnQua2V5Q29kZVxuXG4gICAgaWYgKGtleWNvZGUgPT09IElucHV0cy5LRVlfRVNDQVBFKSB7XG4gICAgICAvLyBoYW5kbGUgRXNjYXBlIGtleSAoRVNDKVxuICAgICAgdGhpcy5jYW5jZWwoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVDbGljayhldmVudDogRXZlbnQpIHtcbiAgICBwcmV2ZW50RGVmYXVsdChldmVudClcbiAgICB0aGlzLmNhbmNlbCgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2Nsb3NlKCkge1xuICAgIGVuYWJsZUJvZHlTY3JvbGwodGhpcy5lbGVtZW50KVxuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5fa2V5ZG93bkhhbmRsZXIpXG4gICAgdGhpcy5fYmFja2Ryb3AuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fY2FuY2VsSGFuZGxlcilcblxuICAgIHRoaXMuX2JhY2tkcm9wLnJlbW92ZUNsYXNzKENMQVNTX0JBQ0tEUk9QX09QRU4pXG4gICAgdGhpcy5yZW1vdmVDbGFzcyhDTEFTU19PUEVOKVxuXG4gICAgZm9yIChsZXQgY2xvc2VCdXR0b24gb2YgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoQ0xBU1NfQlVUVE9OU19DTE9TRSkpIHtcbiAgICAgIGNsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9jYW5jZWxIYW5kbGVyKVxuICAgIH1cblxuICAgIGZvciAobGV0IG9rYXlCdXR0b24gb2YgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoQ0xBU1NfQlVUVE9OU19PS0FZKSkge1xuICAgICAgb2theUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fb2theUhhbmRsZXIpXG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyByZW1vdmUgdGhlIGJhY2tkcm9wIGZyb20gdGhlIGJvZHlcbiAgICAgIHRoaXMuX2JhY2tkcm9wUGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuX2JhY2tkcm9wLmVsZW1lbnQpXG4gICAgfSwgMzAwKVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBtb2RhbCBkaWFsb2cuXG4gICAqIEBmaXJlcyBNb2RhbCNvcGVuZWRcbiAgICovXG4gIHB1YmxpYyBvcGVuKCkge1xuICAgIGRpc2FibGVCb2R5U2Nyb2xsKHRoaXMuZWxlbWVudCwge1xuICAgICAgYWxsb3dUb3VjaE1vdmU6IChlbCkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudEVsID0gZWxcblxuICAgICAgICB3aGlsZSAoY3VycmVudEVsICYmIGN1cnJlbnRFbCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB1c2VyIGlzIHNjcm9sbGluZyB0aGUgbW9kYWwgYm9keVxuICAgICAgICAgIGlmIChjdXJyZW50RWwuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX0JPRFkpKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgZWxlbWVudCBvdmVyZmxvd3NcbiAgICAgICAgICAgIGlmIChjdXJyZW50RWwuc2Nyb2xsSGVpZ2h0ID4gY3VycmVudEVsLmNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN1cnJlbnRFbCA9IGN1cnJlbnRFbC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gYWRkIHRoZSBiYWNrZHJvcCB0byB0aGUgYm9keVxuICAgIHRoaXMuX2JhY2tkcm9wUGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX2JhY2tkcm9wLmVsZW1lbnQpXG5cbiAgICAvLyBzZXQgdGhlIGVsZW1lbnQgdG8gZmxleCBhcyBpdCBpcyBpbml0aWFsbHkgaGlkZGVuXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIlxuXG4gICAgLy8gcmVtb3ZlIHRoZSBzdHlsZSBhZnRlciB0aGUgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIlwiXG4gICAgfSwgODAwKVxuXG4gICAgLy8gd2FpdCBhIGJpdCB0byBhbGxvdyB0aGUgYnJvd3NlciB0byBjYXRjaCB1cCBhbmQgc2hvdyB0aGUgYW5pbWF0aW9uXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFkZENsYXNzKENMQVNTX09QRU4pXG4gICAgICB0aGlzLl9iYWNrZHJvcC5hZGRDbGFzcyhDTEFTU19CQUNLRFJPUF9PUEVOKVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9rZXlkb3duSGFuZGxlcilcblxuICAgICAgdGhpcy5fYmFja2Ryb3AuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fY2FuY2VsSGFuZGxlcilcblxuICAgICAgZm9yIChsZXQgY2xvc2VCdXR0b24gb2YgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoQ0xBU1NfQlVUVE9OU19DTE9TRSkpIHtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2NhbmNlbEhhbmRsZXIpXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IG9rYXlCdXR0b24gb2YgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoQ0xBU1NfQlVUVE9OU19PS0FZKSkge1xuICAgICAgICBva2F5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9va2F5SGFuZGxlcilcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTogRXZlbnQpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpXG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcIm9wZW5lZFwiKVxuICAgIH0sIDUwKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgKGFuZCBjbG9zZXMpIHRoZSBtb2RhbCBkaWFsb2cuXG4gICAqIEBmaXJlcyBNb2RhbCNjYW5jZWxsZWRcbiAgICogQGZpcmVzIE1vZGFsI2Nsb3NlZFxuICAgKi9cbiAgcHVibGljIGNhbmNlbCgpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJjYW5jZWxsZWRcIilcbiAgICB0aGlzLl9jbG9zZSgpXG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBtb2RhbCBkaWFsb2cuXG4gICAqIEBmaXJlcyBNb2RhbCNjbG9zZWRcbiAgICovXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICB0aGlzLl9jbG9zZSgpXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFwiY2xvc2VkXCIpXG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGNvbXBvbmVudCBhbmQgZnJlZXMgYWxsIHJlZmVyZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNhbmNlbCgpXG4gICAgdGhpcy5fdW5zdWJzY3JpYmVGcm9tVHJpZ2dlcigpXG4gIH1cblxuICAvKipcbiAgICogRmlyZWQgd2hlbiB0aGUgbW9kYWwgZGlhbG9nIGlzIG9wZW5lZCBieSB0aGUgYW5jaG9yIGxpbmsgb3IgdXNpbmcgdGhlXG4gICAqIHtAbGluayBNb2RhbCNvcGVufSBtZXRob2QuXG4gICAqIEBldmVudCBNb2RhbCNvcGVuZWRcbiAgICogQHR5cGUge29iamVjdH1cbiAgICovXG5cbiAgLyoqXG4gICAqIEZpcmVkIHdoZW4gdGhlIG1vZGFsIGRpYWxvZyBpcyBjbG9zZWQgYnkgdGhlIHVzZXIgb3IgdXNpbmcgdGhlXG4gICAqIHtAbGluayBNb2RhbCNjbG9zZX0gbWV0aG9kLlxuICAgKiBAZXZlbnQgTW9kYWwjY2xvc2VkXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqL1xuXG4gIC8qKlxuICAgKiBGaXJlZCB3aGVuIHRoZSBtb2RhbCBkaWFsb2cgaXMgY2FuY2VsbGVkIGJ5IHRoZSB1c2VyIG9yIHVzaW5nIHRoZVxuICAgKiB7QGxpbmsgTW9kYWwjY2FuY2VsfSBtZXRob2QuXG4gICAqIEBldmVudCBNb2RhbCNjYW5jZWxsZWRcbiAgICogQHR5cGUge29iamVjdH1cbiAgICovXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBzZWFyY2hBbmRJbml0aWFsaXplPEhUTUxFbGVtZW50PihcIi5tb2RhbFwiLCAoZSkgPT4ge1xuICAgIG5ldyBNb2RhbChlKVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
