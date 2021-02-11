import { __extends } from "tslib";
import { searchAndInitialize, remove } from "../Utils";
import DomElement from "../DomElement";
import flatpickr from "flatpickr";
import { Italian } from "flatpickr/dist/l10n/it.js";
import { French } from "flatpickr/dist/l10n/fr.js";
import { German } from "flatpickr/dist/l10n/de.js";
flatpickr.localize(Italian);
flatpickr.localize(French);
flatpickr.localize(German);
var DEFAULTS_FLATPICKR = {
    wrap: true,
    allowInput: true,
    locale: "de",
    dateFormat: "d.m.Y",
    time_24hr: true
};
var CLASS_HAS_VALUE = "is-fixed";
var CLASS_MESSAGE = ".message";
/**
 * Input field component
 */
var InputField = /** @class */ (function (_super) {
    __extends(InputField, _super);
    function InputField(element, datePickerOptions) {
        var _this = _super.call(this, element) || this;
        _this._changedHandler = _this.onValueChanged.bind(_this);
        _this._animationStartHandler = _this._onAnimationStart.bind(_this);
        _this._datePickerOptions = datePickerOptions;
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the input field component.
     * @private
     */
    InputField.prototype._initialize = function () {
        this.element.addEventListener("input", this._changedHandler);
        if (this.element.getAttribute("type") === "password") {
            this.element.addEventListener("animationstart", this._animationStartHandler);
        }
        this._initializeDatePicker();
        this.onValueChanged();
    };
    InputField.prototype._initializeDatePicker = function () {
        var picker = this.element.parentElement;
        if (!picker || !picker.classList.contains("flatpickr")) {
            return;
        }
        if (!this._datePickerOptions) {
            try {
                this._datePickerOptions = JSON.parse(picker.dataset.options || "{}");
            }
            catch (e) {
                this._datePickerOptions = {};
                // tslint:disable-next-line:no-console
                console.warn("_initializeDatePicker JSON.parse failed", picker.dataset.options, e);
            }
        }
        this._flatpickrInstance = flatpickr(picker, Object.assign({}, DEFAULTS_FLATPICKR, this._datePickerOptions));
    };
    InputField.prototype._destroyDatePicker = function () {
        if (this._flatpickrInstance) {
            this._flatpickrInstance.destroy();
        }
    };
    InputField.prototype._onAnimationStart = function (e) {
        if (e.animationName === "onAutoFillStart") {
            this.onValueChanged(true);
        }
    };
    /**
     * Notifies the input field component that it's value has been changed.
     */
    InputField.prototype.onValueChanged = function (force) {
        if (force === void 0) { force = false; }
        if (this.element.value && this.element.value !== "" || force === true) {
            this.addClass(CLASS_HAS_VALUE);
        }
        else {
            this.removeClass(CLASS_HAS_VALUE);
            this.element.value = "";
        }
    };
    /**
     * Destroys the component and frees all references.
     */
    InputField.prototype.destroy = function () {
        this.element.removeEventListener("input", this._changedHandler);
        if (this.element.getAttribute("type") === "password") {
            this.element.removeEventListener("animationstart", this._animationStartHandler);
        }
        this._changedHandler = undefined;
        this._animationStartHandler = undefined;
        this._destroyDatePicker();
    };
    /**
     * Displays the specified error text underneath the input field.
     * @param {text} text The error text/html to display; or undefined to hide the message.
     */
    InputField.prototype.showError = function (text) {
        var message;
        if (this.element.parentElement) {
            var msg_1 = this.element.parentElement.querySelector(CLASS_MESSAGE);
            if (msg_1) {
                message = new DomElement(msg_1);
            }
        }
        if (!text || text === "") {
            if (message) {
                remove(message.element);
            }
            this.removeClass("invalid");
            return;
        }
        this.addClass("invalid");
        if (!message) {
            message = new DomElement("div")
                .addClass("message");
            this.element.parentElement.appendChild(message.element);
        }
        else {
            message.empty();
        }
        var icon = new DomElement("i")
            .addClass("icon")
            .addClass("icon-026-exclamation-mark-circle")
            .setAttribute("aria-hidden", "true");
        var msg = new DomElement("span")
            .setHtml(text);
        message.appendChild(icon);
        message.appendChild(msg);
    };
    return InputField;
}(DomElement));
export function init() {
    searchAndInitialize(".input-field input", function (e) {
        new InputField(e);
    }, function (e) { return e.parentElement; });
}
export default InputField;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2Zvcm0vSW5wdXRGaWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0RCxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFDdEMsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFBO0FBRWpDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBRWxELFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDM0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQixTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRTFCLElBQU0sa0JBQWtCLEdBQUc7SUFDekIsSUFBSSxFQUFFLElBQUk7SUFDVixVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUUsSUFBSTtJQUNaLFVBQVUsRUFBRSxPQUFPO0lBQ25CLFNBQVMsRUFBRSxJQUFJO0NBQ2hCLENBQUE7QUFFRCxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUE7QUFDbEMsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFBO0FBRWhDOztHQUVHO0FBQ0g7SUFBeUIsOEJBQTRCO0lBTW5ELG9CQUFZLE9BQXlCLEVBQUUsaUJBQXVCO1FBQTlELFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBTWY7UUFKQyxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFBO1FBQ3JELEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFBO1FBQy9ELEtBQUksQ0FBQyxrQkFB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WSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUV0QyxJQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7YUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWhCLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDekIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQXBJQSxBQW9JQyxDQXBJd0IsVUFBVSxHQW9JbEM7QUFFRCxNQUFNLFVBQVUsSUFBSTtJQUNsQixtQkFBbUIsQ0FBbUIsb0JBQW9CLEVBQUUsVUFBQyxDQUFDO1FBQzVELElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25CLENBQUMsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxhQUFjLEVBQWhCLENBQWdCLENBQUMsQ0FBQTtBQUM3QixDQUFDO0FBRUQsZUFBZSxVQUFVLENBQUEiLCJmaWxlIjoibWFpbi9zcmMvZm9ybS9JbnB1dEZpZWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VhcmNoQW5kSW5pdGlhbGl6ZSwgcmVtb3ZlIH0gZnJvbSBcIi4uL1V0aWxzXCJcbmltcG9ydCBEb21FbGVtZW50IGZyb20gXCIuLi9Eb21FbGVtZW50XCJcbmltcG9ydCBmbGF0cGlja3IgZnJvbSBcImZsYXRwaWNrclwiXG5cbmltcG9ydCB7IEl0YWxpYW4gfSBmcm9tIFwiZmxhdHBpY2tyL2Rpc3QvbDEwbi9pdC5qc1wiXG5pbXBvcnQgeyBGcmVuY2ggfSBmcm9tIFwiZmxhdHBpY2tyL2Rpc3QvbDEwbi9mci5qc1wiXG5pbXBvcnQgeyBHZXJtYW4gfSBmcm9tIFwiZmxhdHBpY2tyL2Rpc3QvbDEwbi9kZS5qc1wiXG5cbmZsYXRwaWNrci5sb2NhbGl6ZShJdGFsaWFuKVxuZmxhdHBpY2tyLmxvY2FsaXplKEZyZW5jaClcbmZsYXRwaWNrci5sb2NhbGl6ZShHZXJtYW4pXG5cbmNvbnN0IERFRkFVTFRTX0ZMQVRQSUNLUiA9IHtcbiAgd3JhcDogdHJ1ZSwgLy8gZW5hYmxlIGNhbGVuZGFyIHRvZ2dsZSBpY29uXG4gIGFsbG93SW5wdXQ6IHRydWUsIC8vIGRvbid0IHNldCBpbnB1dCB0byByZWFkb25seVxuICBsb2NhbGU6IFwiZGVcIiwgLy8gR2VybWFuIGlzIGRlZmF1bHRcbiAgZGF0ZUZvcm1hdDogXCJkLm0uWVwiLCAvLyAxNS4wMS4yMDE3XG4gIHRpbWVfMjRocjogdHJ1ZVxufVxuXG5jb25zdCBDTEFTU19IQVNfVkFMVUUgPSBcImlzLWZpeGVkXCJcbmNvbnN0IENMQVNTX01FU1NBR0UgPSBcIi5tZXNzYWdlXCJcblxuLyoqXG4gKiBJbnB1dCBmaWVsZCBjb21wb25lbnRcbiAqL1xuY2xhc3MgSW5wdXRGaWVsZCBleHRlbmRzIERvbUVsZW1lbnQ8SFRNTElucHV0RWxlbWVudD4ge1xuICBwcml2YXRlIF9jaGFuZ2VkSGFuZGxlcjogKCkgPT4gdm9pZFxuICBwcml2YXRlIF9hbmltYXRpb25TdGFydEhhbmRsZXI6IChlOiBBbmltYXRpb25FdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9mbGF0cGlja3JJbnN0YW5jZTogYW55XG4gIHByaXZhdGUgX2RhdGVQaWNrZXJPcHRpb25zOiBhbnlcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LCBkYXRlUGlja2VyT3B0aW9ucz86IGFueSkge1xuICAgIHN1cGVyKGVsZW1lbnQpXG5cbiAgICB0aGlzLl9jaGFuZ2VkSGFuZGxlciA9IHRoaXMub25WYWx1ZUNoYW5nZWQuYmluZCh0aGlzKVxuICAgIHRoaXMuX2FuaW1hdGlvblN0YXJ0SGFuZGxlciA9IHRoaXMuX29uQW5pbWF0aW9uU3RhcnQuYmluZCh0aGlzKVxuICAgIHRoaXMuX2RhdGVQaWNrZXJPcHRpb25zID0gZGF0ZVBpY2tlck9wdGlvbnNcbiAgICB0aGlzLl9pbml0aWFsaXplKClcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgaW5wdXQgZmllbGQgY29tcG9uZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplKCkge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5fY2hhbmdlZEhhbmRsZXIpXG5cbiAgICBpZiAodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcInR5cGVcIikgPT09IFwicGFzc3dvcmRcIikge1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25zdGFydFwiLCB0aGlzLl9hbmltYXRpb25TdGFydEhhbmRsZXIpXG4gICAgfVxuXG4gICAgdGhpcy5faW5pdGlhbGl6ZURhdGVQaWNrZXIoKVxuICAgIHRoaXMub25WYWx1ZUNoYW5nZWQoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplRGF0ZVBpY2tlcigpIHtcbiAgICBjb25zdCBwaWNrZXIgPSB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgIGlmICghcGlja2VyIHx8ICFwaWNrZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxhdHBpY2tyXCIpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCF0aGlzLl9kYXRlUGlja2VyT3B0aW9ucykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fZGF0ZVBpY2tlck9wdGlvbnMgPSBKU09OLnBhcnNlKHBpY2tlci5kYXRhc2V0Lm9wdGlvbnMgfHwgXCJ7fVwiKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLl9kYXRlUGlja2VyT3B0aW9ucyA9IHt9XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihcIl9pbml0aWFsaXplRGF0ZVBpY2tlciBKU09OLnBhcnNlIGZhaWxlZFwiLCBwaWNrZXIuZGF0YXNldC5vcHRpb25zLCBlKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9mbGF0cGlja3JJbnN0YW5jZSA9IGZsYXRwaWNrcihwaWNrZXIsIE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRTX0ZMQVRQSUNLUiwgdGhpcy5fZGF0ZVBpY2tlck9wdGlvbnMpKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9kZXN0cm95RGF0ZVBpY2tlcigpIHtcbiAgICBpZiAodGhpcy5fZmxhdHBpY2tySW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2ZsYXRwaWNrckluc3RhbmNlLmRlc3Ryb3koKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfb25BbmltYXRpb25TdGFydChlOiBBbmltYXRpb25FdmVudCkge1xuICAgIGlmIChlLmFuaW1hdGlvbk5hbWUgPT09IFwib25BdXRvRmlsbFN0YXJ0XCIpIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQodHJ1ZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTm90aWZpZXMgdGhlIGlucHV0IGZpZWxkIGNvbXBvbmVudCB0aGF0IGl0J3MgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICovXG4gIHB1YmxpYyBvblZhbHVlQ2hhbmdlZChmb3JjZSA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudC52YWx1ZSAmJiB0aGlzLmVsZW1lbnQudmFsdWUgIT09IFwiXCIgfHwgZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoQ0xBU1NfSEFTX1ZBTFVFKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKENMQVNTX0hBU19WQUxVRSlcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IFwiXCJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGNvbXBvbmVudCBhbmQgZnJlZXMgYWxsIHJlZmVyZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHRoaXMuX2NoYW5nZWRIYW5kbGVyKVxuXG4gICAgaWYgKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpID09PSBcInBhc3N3b3JkXCIpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uc3RhcnRcIiwgdGhpcy5fYW5pbWF0aW9uU3RhcnRIYW5kbGVyKVxuICAgIH1cblxuICAgICh0aGlzIGFzIGFueSkuX2NoYW5nZWRIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgICh0aGlzIGFzIGFueSkuX2FuaW1hdGlvblN0YXJ0SGFuZGxlciA9IHVuZGVmaW5lZFxuXG4gICAgdGhpcy5fZGVzdHJveURhdGVQaWNrZXIoKVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIHRoZSBzcGVjaWZpZWQgZXJyb3IgdGV4dCB1bmRlcm5lYXRoIHRoZSBpbnB1dCBmaWVsZC5cbiAgICogQHBhcmFtIHt0ZXh0fSB0ZXh0IFRoZSBlcnJvciB0ZXh0L2h0bWwgdG8gZGlzcGxheTsgb3IgdW5kZWZpbmVkIHRvIGhpZGUgdGhlIG1lc3NhZ2UuXG4gICAqL1xuICBwdWJsaWMgc2hvd0Vycm9yKHRleHQ6IHN0cmluZykge1xuICAgIGxldCBtZXNzYWdlXG4gICAgaWYgKHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICBsZXQgbXNnID0gdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihDTEFTU19NRVNTQUdFKVxuXG4gICAgICBpZiAobXNnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBuZXcgRG9tRWxlbWVudChtc2cpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0ZXh0IHx8IHRleHQgPT09IFwiXCIpIHtcbiAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIHJlbW92ZShtZXNzYWdlLmVsZW1lbnQpXG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJpbnZhbGlkXCIpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKFwiaW52YWxpZFwiKVxuXG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0gbmV3IERvbUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLmFkZENsYXNzKFwibWVzc2FnZVwiKVxuXG4gICAgICB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQobWVzc2FnZS5lbGVtZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlLmVtcHR5KClcbiAgICB9XG5cbiAgICBjb25zdCBpY29uID0gbmV3IERvbUVsZW1lbnQoXCJpXCIpXG4gICAgICAuYWRkQ2xhc3MoXCJpY29uXCIpXG4gICAgICAuYWRkQ2xhc3MoXCJpY29uLTAyNi1leGNsYW1hdGlvbi1tYXJrLWNpcmNsZVwiKVxuICAgICAgLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKVxuXG4gICAgY29uc3QgbXNnID0gbmV3IERvbUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgICAuc2V0SHRtbCh0ZXh0KVxuXG4gICAgbWVzc2FnZS5hcHBlbmRDaGlsZChpY29uKVxuICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQobXNnKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBzZWFyY2hBbmRJbml0aWFsaXplPEhUTUxJbnB1dEVsZW1lbnQ+KFwiLmlucHV0LWZpZWxkIGlucHV0XCIsIChlKSA9PiB7XG4gICAgbmV3IElucHV0RmllbGQoZSlcbiAgfSwgKGUpID0+IGUucGFyZW50RWxlbWVudCEpXG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0RmllbGRcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
