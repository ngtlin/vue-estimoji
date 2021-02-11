import * as Dom from "./DomFunctions";
var htmlEvents;
/**
 * A wrapper class for DOM Elements.
 */
var DomElement = /** @class */ (function () {
    /**
     * Creates a new instance.
     * @param {Element} - The element to wrap.
     * @param {String} - The DOM element to create.
     */
    function DomElement(element) {
        if (typeof element === "string") {
            this.element = document.createElement(element);
        }
        else {
            this.element = element;
        }
    }
    /**
     * Adds the specified CSS class to the element.
     * @param {String} - The class name to add.
     * @return {DomElement} Returns the current instance for fluent chaining of calls.
     */
    DomElement.prototype.addClass = function (name) {
        Dom.addClass(this.element, name);
        return this;
    };
    /**
     * Removes the specified CSS class from the element.
     * @param {String} - The class name to remove.
     * @return {DomElement} Returns the current instance for fluent chaining of calls.
     */
    DomElement.prototype.removeClass = function (name) {
        Dom.removeClass(this.element, name);
        return this;
    };
    DomElement.prototype.hasClass = function (name) {
        return Dom.hasClass(this.element, name);
    };
    DomElement.prototype.toggleClass = function (name) {
        Dom.toggleClass(this.element, name);
        return this;
    };
    Object.defineProperty(DomElement.prototype, "classes", {
        get: function () {
            return this.element.classList;
        },
        enumerable: false,
        configurable: true
    });
    DomElement.prototype.setId = function (id) {
        this.element.setAttribute("id", id);
        return this;
    };
    Object.defineProperty(DomElement.prototype, "innerText", {
        get: function () {
            return Dom.text(this.element);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomElement.prototype, "innerHtml", {
        get: function () {
            return this.element.innerHTML;
        },
        enumerable: false,
        configurable: true
    });
    DomElement.prototype.setHtml = function (value) {
        if (typeof value !== "string") {
            throw new Error("Expected HTML string");
        }
        this.element.innerHTML = value;
        return this;
    };
    DomElement.prototype.getAttribute = function (name) {
        return this.element.getAttribute(name);
    };
    DomElement.prototype.setAttribute = function (name, value) {
        this.element.setAttribute(name, value);
        return this;
    };
    /**
     * Registers an event listener.
     */
    DomElement.prototype.addEventListener = function (type, listener) {
        this.element.addEventListener(type, listener);
    };
    /**
     * Unregisters an event listener on the component.
     */
    DomElement.prototype.removeEventListener = function (type, listener) {
        this.element.removeEventListener(type, listener);
    };
    DomElement.prototype.appendChild = function (newChild) {
        if (!(newChild instanceof DomElement)) {
            throw new Error("Only other DomElements can be added as children");
        }
        this.element.appendChild(newChild.element);
        return this;
    };
    DomElement.prototype.prependChild = function (newChild) {
        if (!(newChild instanceof DomElement)) {
            throw new Error("Only other DomElements can be added as children");
        }
        this.element.insertBefore(newChild.element, this.element.firstChild);
        return this;
    };
    DomElement.prototype.insertBefore = function (newChild) {
        if (!(newChild instanceof DomElement)) {
            throw new Error("Only other DomElements can be added as children");
        }
        if (!this.element.parentNode) {
            throw new Error("Element is not attached");
        }
        this.element.parentNode.insertBefore(newChild.element, this.element);
        return this;
    };
    DomElement.prototype.insertAfter = function (newChild) {
        if (!(newChild instanceof DomElement)) {
            throw new Error("Only other DomElements can be added as children");
        }
        if (!this.element.parentNode) {
            throw new Error("Element is not attached");
        }
        this.element.parentNode.insertBefore(newChild.element, this.element.nextSibling);
        return this;
    };
    DomElement.prototype.removeChild = function (oldChild) {
        if (!(oldChild instanceof DomElement)) {
            throw new Error("Only a DomElements child can be removed");
        }
        this.element.removeChild(oldChild.element);
    };
    DomElement.prototype.find = function (selectors) {
        var e = this.element.querySelector(selectors);
        if (e) {
            return new DomElement(e);
        }
        return undefined;
    };
    DomElement.prototype.wrapWithElement = function (wrapperElement) {
        if (!this.element.parentNode) {
            throw new Error("Element is not attached");
        }
        this.element.parentNode.replaceChild(wrapperElement.element, this.element);
        wrapperElement.element.appendChild(this.element);
        return this;
    };
    DomElement.prototype.dispatchEvent = function (eventName) {
        var event;
        var el = this.element;
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
        }
        else if (document.createEventObject) { // IE < 9
            event = document.createEventObject();
            event.eventType = eventName;
        }
        event.eventName = eventName;
        if (el.dispatchEvent) {
            el.dispatchEvent(event);
        }
        else if (el.fireEvent && htmlEvents["on" + eventName]) { // IE < 9
            el.fireEvent("on" + event.eventType, event); // can trigger only real event (e.g. 'click')
        }
        else if (el[eventName]) {
            el[eventName]();
        }
        else if (el["on" + eventName]) {
            el["on" + eventName]();
        }
    };
    DomElement.prototype.css = function (property) {
        return Dom.css(this.element, property);
    };
    /**
     * Removes all child nodes of the current DomElement.
     */
    DomElement.prototype.empty = function () {
        Dom.empty(this.element);
    };
    return DomElement;
}());
export default DomElement;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL0RvbUVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQTtBQUVyQyxJQUFJLFVBRUgsQ0FBQTtBQUVEOztHQUVHO0FBQ0g7SUFFRTs7OztPQUlHO0lBQ0gsb0JBQVksT0FBb0M7UUFDOUMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBaUIsQ0FBQTtTQUMvRDthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7U0FDdkI7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDZCQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDaEMsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGdDQUFXLEdBQWxCLFVBQW1CLElBQVk7UUFDN0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ25DLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVNLDZCQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRU0sZ0NBQVcsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDbkMsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsc0JBQUksK0JBQU87YUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUE7UUFDL0IsQ0FBQzs7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QztJQUNILENBQUM7SUFFTSx3QkFBRyxHQUFWLFVBQVcsUUFBZ0I7UUFDekIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMEJBQUssR0FBWjtRQUNFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFDSCxpQkFBQztBQUFELENBbk1BLEFBbU1DLElBQUE7QUFFRCxlQUFlLFVBQVUsQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9Eb21FbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRG9tIGZyb20gXCIuL0RvbUZ1bmN0aW9uc1wiXG5cbmxldCBodG1sRXZlbnRzOiB7XG4gIFtldmVudE5hbWU6IHN0cmluZ106ICgpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQSB3cmFwcGVyIGNsYXNzIGZvciBET00gRWxlbWVudHMuXG4gKi9cbmNsYXNzIERvbUVsZW1lbnQ8VCBleHRlbmRzIEVsZW1lbnQgPSBFbGVtZW50PiB7XG4gIHB1YmxpYyBlbGVtZW50OiBUXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IC0gVGhlIGVsZW1lbnQgdG8gd3JhcC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IC0gVGhlIERPTSBlbGVtZW50IHRvIGNyZWF0ZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IFQgfCBrZXlvZiBFbGVtZW50VGFnTmFtZU1hcCkge1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KSBhcyBFbGVtZW50IGFzIFRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBzcGVjaWZpZWQgQ1NTIGNsYXNzIHRvIHRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gLSBUaGUgY2xhc3MgbmFtZSB0byBhZGQuXG4gICAqIEByZXR1cm4ge0RvbUVsZW1lbnR9IFJldHVybnMgdGhlIGN1cnJlbnQgaW5zdGFuY2UgZm9yIGZsdWVudCBjaGFpbmluZyBvZiBjYWxscy5cbiAgICovXG4gIHB1YmxpYyBhZGRDbGFzcyhuYW1lOiBzdHJpbmcpIHtcbiAgICBEb20uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCBuYW1lKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIENTUyBjbGFzcyBmcm9tIHRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gLSBUaGUgY2xhc3MgbmFtZSB0byByZW1vdmUuXG4gICAqIEByZXR1cm4ge0RvbUVsZW1lbnR9IFJldHVybnMgdGhlIGN1cnJlbnQgaW5zdGFuY2UgZm9yIGZsdWVudCBjaGFpbmluZyBvZiBjYWxscy5cbiAgICovXG4gIHB1YmxpYyByZW1vdmVDbGFzcyhuYW1lOiBzdHJpbmcpIHtcbiAgICBEb20ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50LCBuYW1lKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBwdWJsaWMgaGFzQ2xhc3MobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIERvbS5oYXNDbGFzcyh0aGlzLmVsZW1lbnQsIG5hbWUpXG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQ2xhc3MobmFtZTogc3RyaW5nKSB7XG4gICAgRG9tLnRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudCwgbmFtZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0IGNsYXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3RcbiAgfVxuXG4gIHB1YmxpYyBzZXRJZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBnZXQgaW5uZXJUZXh0KCkge1xuICAgIHJldHVybiBEb20udGV4dCh0aGlzLmVsZW1lbnQpXG4gIH1cblxuICBnZXQgaW5uZXJIdG1sKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MXG4gIH1cblxuICBwdWJsaWMgc2V0SHRtbCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgSFRNTCBzdHJpbmdcIilcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcHVibGljIGdldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKVxuICB9XG5cbiAgcHVibGljIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKi9cbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXI8VCBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA+KHR5cGU6IFQsIGxpc3RlbmVyOiAoZTogRXZlbnQpID0+IHZvaWQpIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXI8VCBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA+KHR5cGU6IFQsIGxpc3RlbmVyOiAoZTogRXZlbnQpID0+IHZvaWQpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcilcbiAgfVxuXG4gIHB1YmxpYyBhcHBlbmRDaGlsZChuZXdDaGlsZDogRG9tRWxlbWVudCkge1xuICAgIGlmICghKG5ld0NoaWxkIGluc3RhbmNlb2YgRG9tRWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgb3RoZXIgRG9tRWxlbWVudHMgY2FuIGJlIGFkZGVkIGFzIGNoaWxkcmVuXCIpXG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkLmVsZW1lbnQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHB1YmxpYyBwcmVwZW5kQ2hpbGQobmV3Q2hpbGQ6IERvbUVsZW1lbnQpIHtcbiAgICBpZiAoIShuZXdDaGlsZCBpbnN0YW5jZW9mIERvbUVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IG90aGVyIERvbUVsZW1lbnRzIGNhbiBiZSBhZGRlZCBhcyBjaGlsZHJlblwiKVxuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQuZWxlbWVudCwgdGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHB1YmxpYyBpbnNlcnRCZWZvcmUobmV3Q2hpbGQ6IERvbUVsZW1lbnQpIHtcbiAgICBpZiAoIShuZXdDaGlsZCBpbnN0YW5jZW9mIERvbUVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IG90aGVyIERvbUVsZW1lbnRzIGNhbiBiZSBhZGRlZCBhcyBjaGlsZHJlblwiKVxuICAgIH1cbiAgICBpZiAoIXRoaXMuZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbGVtZW50IGlzIG5vdCBhdHRhY2hlZFwiKVxuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdDaGlsZC5lbGVtZW50LCB0aGlzLmVsZW1lbnQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHB1YmxpYyBpbnNlcnRBZnRlcihuZXdDaGlsZDogRG9tRWxlbWVudCkge1xuICAgIGlmICghKG5ld0NoaWxkIGluc3RhbmNlb2YgRG9tRWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgb3RoZXIgRG9tRWxlbWVudHMgY2FuIGJlIGFkZGVkIGFzIGNoaWxkcmVuXCIpXG4gICAgfVxuICAgIGlmICghdGhpcy5lbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgaXMgbm90IGF0dGFjaGVkXCIpXG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLmVsZW1lbnQsIHRoaXMuZWxlbWVudC5uZXh0U2libGluZylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkKG9sZENoaWxkOiBEb21FbGVtZW50KSB7XG4gICAgaWYgKCEob2xkQ2hpbGQgaW5zdGFuY2VvZiBEb21FbGVtZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBhIERvbUVsZW1lbnRzIGNoaWxkIGNhbiBiZSByZW1vdmVkXCIpXG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkLmVsZW1lbnQpXG4gIH1cblxuICBwdWJsaWMgZmluZChzZWxlY3RvcnM6IHN0cmluZykge1xuICAgIGxldCBlID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzKVxuICAgIGlmIChlKSB7XG4gICAgICByZXR1cm4gbmV3IERvbUVsZW1lbnQoZSBhcyBFbGVtZW50KVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIHB1YmxpYyB3cmFwV2l0aEVsZW1lbnQod3JhcHBlckVsZW1lbnQ6IERvbUVsZW1lbnQpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbGVtZW50IGlzIG5vdCBhdHRhY2hlZFwiKVxuICAgIH1cbiAgICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQod3JhcHBlckVsZW1lbnQuZWxlbWVudCwgdGhpcy5lbGVtZW50KVxuICAgIHdyYXBwZXJFbGVtZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHB1YmxpYyBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGV2ZW50XG4gICAgbGV0IGVsID0gdGhpcy5lbGVtZW50XG5cbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpXG4gICAgICBldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKVxuICAgIH0gZWxzZSBpZiAoKGRvY3VtZW50IGFzIGFueSkuY3JlYXRlRXZlbnRPYmplY3QpIHsgLy8gSUUgPCA5XG4gICAgICBldmVudCA9IChkb2N1bWVudCBhcyBhbnkpLmNyZWF0ZUV2ZW50T2JqZWN0KClcbiAgICAgIGV2ZW50LmV2ZW50VHlwZSA9IGV2ZW50TmFtZVxuICAgIH1cbiAgICBldmVudC5ldmVudE5hbWUgPSBldmVudE5hbWVcbiAgICBpZiAoZWwuZGlzcGF0Y2hFdmVudCkge1xuICAgICAgZWwuZGlzcGF0Y2hFdmVudChldmVudClcbiAgICB9IGVsc2UgaWYgKChlbCBhcyBhbnkpLmZpcmVFdmVudCAmJiBodG1sRXZlbnRzW2BvbiR7ZXZlbnROYW1lfWBdKSB7IC8vIElFIDwgOVxuICAgICAgKGVsIGFzIGFueSkuZmlyZUV2ZW50KGBvbiR7ZXZlbnQuZXZlbnRUeXBlfWAsIGV2ZW50KSAvLyBjYW4gdHJpZ2dlciBvbmx5IHJlYWwgZXZlbnQgKGUuZy4gJ2NsaWNrJylcbiAgICB9IGVsc2UgaWYgKGVsW2V2ZW50TmFtZSBhcyBrZXlvZiBFbGVtZW50XSkge1xuICAgICAgKGVsIGFzIGFueSlbZXZlbnROYW1lXSgpXG4gICAgfSBlbHNlIGlmIChlbFtgb24ke2V2ZW50TmFtZX1gIGFzIGtleW9mIEVsZW1lbnRdKSB7XG4gICAgICAoZWwgYXMgYW55KVtgb24ke2V2ZW50TmFtZX1gXSgpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNzcyhwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIERvbS5jc3ModGhpcy5lbGVtZW50LCBwcm9wZXJ0eSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBjaGlsZCBub2RlcyBvZiB0aGUgY3VycmVudCBEb21FbGVtZW50LlxuICAgKi9cbiAgcHVibGljIGVtcHR5KCkge1xuICAgIERvbS5lbXB0eSh0aGlzLmVsZW1lbnQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9tRWxlbWVudFxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9
