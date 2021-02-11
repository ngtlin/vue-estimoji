import { __extends } from "tslib";
import { searchAndInitialize } from "../Utils";
import DomElement from "../DomElement";
/**
 * Loader bar component
 */
var LoaderBar = /** @class */ (function (_super) {
    __extends(LoaderBar, _super);
    /**
     * Creates and initializes the LoaderBar component.
     * @param {Element} - The root element of the LoaderBar component.
     */
    function LoaderBar(element) {
        var _this = _super.call(this, element) || this;
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the loader bar component.
     * @private
     */
    LoaderBar.prototype._initialize = function () {
        this.progressElement = this.find(".indicator") || this;
        this.fileNameElement = this.find(".detail > .name");
        this.progressLabelElement = this.find(".progress");
        this.totalProgressElement = this.find(".progress > .file-size");
    };
    Object.defineProperty(LoaderBar.prototype, "progress", {
        /**
         * Gets the current progress value in the range of 0..1.
         */
        get: function () {
            return this.value;
        },
        /**
         * Sets the current progress.
         * @param {number} - The progress in the range of 0..1.
         */
        set: function (val) {
            // val = clamp(val, 0, 1)
            var percentage = (val * 100).toFixed(0);
            this.value = val;
            this.element.value = String(val);
            this.progressElement.setAttribute("style", "width: " + val * 100 + "%");
            if (this.progressLabelElement) {
                this.progressLabelElement.element.textContent = percentage + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoaderBar.prototype, "filename", {
        /**
         * Gets the filename.
         * @returns {string} - The filename.
         */
        get: function () {
            if (!this.fileNameElement) {
                return undefined;
            }
            return this.fileNameElement.element.innerHTML;
        },
        /**
         * Sets the filename.
         */
        set: function (val) {
            if (!this.fileNameElement) {
                throw new Error("Cannot set the filename, missing detail element");
            }
            this.fileNameElement.setHtml(val || "");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoaderBar.prototype, "fileSize", {
        /**
         * Sets the file size label.
         */
        set: function (val) {
            if (!this.totalProgressElement) {
                throw new Error("Cannot set the fileSize, missing detail element");
            }
            this.totalProgressElement.setHtml(val);
        },
        enumerable: false,
        configurable: true
    });
    return LoaderBar;
}(DomElement));
export function init() {
    searchAndInitialize(".loader-bar", function (e) {
        new LoaderBar(e);
    });
}
export default LoaderBar;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2xvYWRlci9Mb2FkZXJCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFFdEM7O0dBRUc7QUFDSDtJQUF3Qiw2QkFBVTtJQVFoQzs7O09BR0c7SUFDSCxtQkFBWSxPQUFnQjtRQUE1QixZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUVmO1FBREMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBOztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sK0JBQVcsR0FBckI7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFBO1FBQ3RELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxDQUFBO1FBQ3BELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBRSxDQUFBO1FBQ25ELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFFLENBQUE7SUFDbEUsQ0FBQztJQUtELHNCQUFJLCtCQUFRO1FBSFo7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNuQixDQUFDO1FBRUQ7OztXQUdHO2FBQ0gsVUFBYSxHQUFHO1lBQ2QseUJBQXlCO1lBRXpCLElBQUksVUFBVSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUV2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsT0FBNEIsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBRXRELElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFVLEdBQUcsR0FBRyxHQUFHLE1BQUcsQ0FBQyxDQUFBO1lBRWxFLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBTSxVQUFVLE1BQUcsQ0FBQTthQUNqRTtRQUNILENBQUM7OztPQW5CQTtJQXlCRCxzQkFBSSwrQkFBUTtRQUpaOzs7V0FHRzthQUNIO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLE9BQU8sU0FBUyxDQUFBO2FBQ2pCO1lBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUE7UUFDL0MsQ0FBQztRQUVEOztXQUVHO2FBQ0gsVUFBYSxHQUF1QjtZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO2FBQ25FO1lBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7OztPQVhBO0lBZ0JELHNCQUFJLCtCQUFRO1FBSFo7O1dBRUc7YUFDSCxVQUFhLEdBQVc7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO2FBQ25FO1lBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN4QyxDQUFDOzs7T0FBQTtJQUNILGdCQUFDO0FBQUQsQ0F2RkEsQUF1RkMsQ0F2RnVCLFVBQVUsR0F1RmpDO0FBRUQsTUFBTSxVQUFVLElBQUk7SUFDbEIsbUJBQW1CLENBQUMsYUFBYSxFQUFFLFVBQUMsQ0FBQztRQUNuQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxlQUFlLFNBQVMsQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9sb2FkZXIvTG9hZGVyQmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VhcmNoQW5kSW5pdGlhbGl6ZSB9IGZyb20gXCIuLi9VdGlsc1wiXG5pbXBvcnQgRG9tRWxlbWVudCBmcm9tIFwiLi4vRG9tRWxlbWVudFwiXG5cbi8qKlxuICogTG9hZGVyIGJhciBjb21wb25lbnRcbiAqL1xuY2xhc3MgTG9hZGVyQmFyIGV4dGVuZHMgRG9tRWxlbWVudCB7XG4gIHByaXZhdGUgcHJvZ3Jlc3NFbGVtZW50ITogRG9tRWxlbWVudFxuICBwcml2YXRlIGZpbGVOYW1lRWxlbWVudCE6IERvbUVsZW1lbnRcbiAgcHJpdmF0ZSBwcm9ncmVzc0xhYmVsRWxlbWVudCE6IERvbUVsZW1lbnRcbiAgcHJpdmF0ZSB0b3RhbFByb2dyZXNzRWxlbWVudCE6IERvbUVsZW1lbnRcblxuICBwcml2YXRlIHZhbHVlITogbnVtYmVyXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSBMb2FkZXJCYXIgY29tcG9uZW50LlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IC0gVGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgTG9hZGVyQmFyIGNvbXBvbmVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuICAgIHRoaXMuX2luaXRpYWxpemUoKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBsb2FkZXIgYmFyIGNvbXBvbmVudC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnByb2dyZXNzRWxlbWVudCA9IHRoaXMuZmluZChcIi5pbmRpY2F0b3JcIikgfHwgdGhpc1xuICAgIHRoaXMuZmlsZU5hbWVFbGVtZW50ID0gdGhpcy5maW5kKFwiLmRldGFpbCA+IC5uYW1lXCIpIVxuICAgIHRoaXMucHJvZ3Jlc3NMYWJlbEVsZW1lbnQgPSB0aGlzLmZpbmQoXCIucHJvZ3Jlc3NcIikhXG4gICAgdGhpcy50b3RhbFByb2dyZXNzRWxlbWVudCA9IHRoaXMuZmluZChcIi5wcm9ncmVzcyA+IC5maWxlLXNpemVcIikhXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBwcm9ncmVzcyB2YWx1ZSBpbiB0aGUgcmFuZ2Ugb2YgMC4uMS5cbiAgICovXG4gIGdldCBwcm9ncmVzcygpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAtIFRoZSBwcm9ncmVzcyBpbiB0aGUgcmFuZ2Ugb2YgMC4uMS5cbiAgICovXG4gIHNldCBwcm9ncmVzcyh2YWwpIHtcbiAgICAvLyB2YWwgPSBjbGFtcCh2YWwsIDAsIDEpXG5cbiAgICBsZXQgcGVyY2VudGFnZSA9ICh2YWwgKiAxMDApLnRvRml4ZWQoMClcblxuICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgKHRoaXMuZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFN0cmluZyh2YWwpXG5cbiAgICB0aGlzLnByb2dyZXNzRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgd2lkdGg6ICR7dmFsICogMTAwfSVgKVxuXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NMYWJlbEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucHJvZ3Jlc3NMYWJlbEVsZW1lbnQuZWxlbWVudC50ZXh0Q29udGVudCA9IGAke3BlcmNlbnRhZ2V9JWBcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZmlsZW5hbWUuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGZpbGVuYW1lLlxuICAgKi9cbiAgZ2V0IGZpbGVuYW1lKCkge1xuICAgIGlmICghdGhpcy5maWxlTmFtZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5maWxlTmFtZUVsZW1lbnQuZWxlbWVudC5pbm5lckhUTUxcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBmaWxlbmFtZS5cbiAgICovXG4gIHNldCBmaWxlbmFtZSh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIGlmICghdGhpcy5maWxlTmFtZUVsZW1lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzZXQgdGhlIGZpbGVuYW1lLCBtaXNzaW5nIGRldGFpbCBlbGVtZW50XCIpXG4gICAgfVxuXG4gICAgdGhpcy5maWxlTmFtZUVsZW1lbnQuc2V0SHRtbCh2YWwgfHwgXCJcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBmaWxlIHNpemUgbGFiZWwuXG4gICAqL1xuICBzZXQgZmlsZVNpemUodmFsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMudG90YWxQcm9ncmVzc0VsZW1lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzZXQgdGhlIGZpbGVTaXplLCBtaXNzaW5nIGRldGFpbCBlbGVtZW50XCIpXG4gICAgfVxuXG4gICAgdGhpcy50b3RhbFByb2dyZXNzRWxlbWVudC5zZXRIdG1sKHZhbClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2VhcmNoQW5kSW5pdGlhbGl6ZShcIi5sb2FkZXItYmFyXCIsIChlKSA9PiB7XG4gICAgbmV3IExvYWRlckJhcihlKVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXJCYXJcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
