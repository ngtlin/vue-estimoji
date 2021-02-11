import { __extends, __values } from "tslib";
import DomElement from "../DomElement";
import { searchAndInitialize, remove } from "../Utils";
import { getAttributeReference } from "../DomFunctions";
import { tryGetData, createLegendItem, isColor, removeAllChildren } from "./ChartFunctions";
import anime from "animejs";
var QUERY_DETAIL_RIGHT = ".detail-right";
var QUERY_DETAIL_BOTTOM = ".detail-bottom";
var QUERY_PROGRESS = ".bar-chart__progress";
var CLASS_UNLIMITED = "bar-chart-horizontal--unlimited";
var CLASS_LIMITED = "bar-chart-horizontal--limited";
var CLASS_DETAIL_VALUE = "value";
var CLASS_DETAIL_UNIT = "unit";
var CLASS_INDICATOR = "indicator";
var CLASS_INDICATOR_WRAPPER = "indicator-wrapper";
var CLASS_TOOLTIP = "tooltip";
var CLASS_TOOLTIP_MULTILINE = "tooltip--multiline";
var ANIMATION_DURATION = 500;
/**
 * Bar Chart Horizontal Component.
 */
var BarChartHorizontal = /** @class */ (function (_super) {
    __extends(BarChartHorizontal, _super);
    /**
     * Creates and initializes the bar chart horizontal component.
     * @param {DomElement} - root element of the chart.
     */
    function BarChartHorizontal(element, data) {
        var _this = _super.call(this, element) || this;
        if (data) {
            _this._data = data;
        }
        _this._legendItems = [];
        _this._initialize();
        return _this;
    }
    BarChartHorizontal.prototype._initialize = function () {
        this._unit = this.getAttribute("data-unit") || "";
        this._maxValue = parseFloat(this.getAttribute("data-max"));
        this._precision = parseInt(this.getAttribute("data-precision"), 10) || 0;
        this._isUnlimited = this.hasClass(CLASS_UNLIMITED);
        this._isLimited = this.hasClass(CLASS_LIMITED);
        this._progessWrapper = this.element.querySelector(QUERY_PROGRESS);
        if (this._isLimited === true) {
            this._detailRight = this.element.querySelector(QUERY_DETAIL_BOTTOM);
        }
        else {
            this._detailRight = this.element.querySelector(QUERY_DETAIL_RIGHT);
        }
        if (this._isUnlimited === false && this._isLimited === false) {
            this._legend = getAttributeReference(this.element, "data-legend");
        }
        if (!this._data) {
            this._data = tryGetData(this.element);
        }
        this._render();
    };
    BarChartHorizontal.prototype._render = function () {
        var e_1, _a;
        var dataOne = this._data[0];
        var dataTwo = this._data[1];
        var tooltip = this._isLimited === false ? this._getTooltipContent(this._data) : undefined;
        var animatedValueElement;
        // Cleanup
        removeAllChildren(this._detailRight);
        removeAllChildren(this._progessWrapper);
        try {
            // Clear only own legend items
            for (var _b = __values(this._legendItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                remove(item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._legendItems = [];
        if (dataOne) {
            if (this._isUnlimited === false || (this._isUnlimited === true && !dataTwo)) {
                var valElement = animatedValueElement = this._createValueElement(dataOne);
                this._detailRight.appendChild(valElement);
                if (this._isLimited === false) {
                    var separatorElement = new DomElement("div")
                        .addClass(CLASS_DETAIL_UNIT)
                        .element;
                    separatorElement.innerText = " " + this._unit;
                    this._detailRight.appendChild(separatorElement);
                }
            }
            // Add the indicator
            var indicator = this._addIndicator(dataOne, tooltip);
            this._animateIndicator(indicator, 0);
            // Animate the value if required
            if (animatedValueElement && this._isLimited === true) {
                this._animateValueElement(animatedValueElement, dataOne.value);
            }
            // Add the legend
            if (this._legend) {
                var legendItem = createLegendItem(dataOne);
                this._legend.appendChild(legendItem);
                this._legendItems.push(legendItem);
                this._animateLegend(legendItem, 0);
            }
        }
        if (dataTwo) {
            var valElement = this._createValueElement(dataTwo);
            var unitElement = new DomElement("div")
                .addClass(CLASS_DETAIL_UNIT)
                .element;
            unitElement.innerText = " " + this._unit;
            this._detailRight.appendChild(valElement);
            this._detailRight.appendChild(unitElement);
            // Add the indicator
            var indicator = this._addIndicator(dataTwo, tooltip);
            this._animateIndicator(indicator, ANIMATION_DURATION);
            // Add the legend
            if (this._legend) {
                var legendItem = createLegendItem(dataTwo);
                this._legend.appendChild(legendItem);
                this._legendItems.push(legendItem);
                this._animateLegend(legendItem, ANIMATION_DURATION);
            }
        }
        if (this._isLimited === true) {
            var valElement = this._createValueElement({ value: this._maxValue });
            var unitElement = new DomElement("div")
                .addClass(CLASS_DETAIL_UNIT)
                .element;
            unitElement.innerText = " " + this._unit;
            this._detailRight.appendChild(valElement);
            this._detailRight.appendChild(unitElement);
        }
    };
    BarChartHorizontal.prototype._animateValueElement = function (animatedValueElement, toValue) {
        var counter = { var: 0 };
        anime({
            targets: counter,
            var: toValue,
            duration: ANIMATION_DURATION,
            easing: "easeOutQuint",
            round: 1,
            update: function () {
                animatedValueElement.innerText = "" + counter.var;
            }
        });
    };
    BarChartHorizontal.prototype._animateIndicator = function (indicatorWrapper, animationOffset) {
        var indicator = indicatorWrapper.getElementsByClassName("indicator")[0];
        var indicatorWidth = indicator.scrollWidth;
        indicator.style.width = "0px";
        anime({
            targets: indicator,
            duration: ANIMATION_DURATION,
            width: indicatorWidth + "px",
            easing: "easeInOutQuint",
            delay: animationOffset,
            complete: function () {
                indicator.style.width = "";
            }
        });
    };
    BarChartHorizontal.prototype._animateLegend = function (legendItem, animationOffset) {
        legendItem.style.opacity = "0";
        anime({
            targets: legendItem,
            duration: ANIMATION_DURATION,
            opacity: 1,
            easing: "easeInOutQuint",
            delay: animationOffset,
            complete: function () {
                legendItem.style.removeProperty("opacity");
            }
        });
    };
    BarChartHorizontal.prototype._createValueElement = function (data) {
        var unlimitedPrefix = "";
        if (this._isUnlimited === true) {
            unlimitedPrefix = "+";
        }
        var value = parseFloat(data.value);
        if (value <= 0) {
            if (this._precision === 0) {
                value = "0";
            }
            else {
                value = ".";
                for (var i = 0; i < this._precision; i++) {
                    value += "0";
                }
            }
        }
        else {
            value = value.toFixed(this._precision);
        }
        var valueElement = new DomElement("div")
            .addClass(CLASS_DETAIL_VALUE)
            .element;
        valueElement.innerText = "" + unlimitedPrefix + value;
        return valueElement;
    };
    BarChartHorizontal.prototype._addIndicator = function (data, tooltip) {
        var width = ((100.0 / this._maxValue) * data.value);
        var indicator = new DomElement("div")
            .addClass(CLASS_INDICATOR);
        if (isColor(data.color) === true) {
            indicator.setAttribute("style", "background-color: " + data.color + ";");
        }
        else {
            indicator.addClass(data.color);
        }
        var indicatorWrapper = new DomElement("div")
            .addClass(CLASS_INDICATOR_WRAPPER)
            .setAttribute("style", "width: " + width + "%")
            .appendChild(indicator)
            .setAttribute("onclick", "void(0)");
        if (tooltip && tooltip !== "") {
            indicatorWrapper
                .addClass(CLASS_TOOLTIP)
                .addClass(CLASS_TOOLTIP_MULTILINE)
                .setAttribute("aria-label", tooltip);
        }
        this._progessWrapper.appendChild(indicatorWrapper.element);
        return indicatorWrapper.element;
    };
    BarChartHorizontal.prototype._getTooltipContent = function (dataList) {
        var e_2, _a;
        var tooltip = "";
        try {
            for (var dataList_1 = __values(dataList), dataList_1_1 = dataList_1.next(); !dataList_1_1.done; dataList_1_1 = dataList_1.next()) {
                var data = dataList_1_1.value;
                tooltip += data.title + ": " + data.value + " " + this._unit + "\n";
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (dataList_1_1 && !dataList_1_1.done && (_a = dataList_1.return)) _a.call(dataList_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return tooltip.trim();
    };
    /**
     * Updates the bar chart with the specified data definitions.
     * @param {Array} - bar chart data definitions.
     */
    BarChartHorizontal.prototype.update = function (data) {
        if (data) {
            this._data = data;
        }
        this._render();
    };
    /**
     * Removes all event handlers and clears references.
     */
    BarChartHorizontal.prototype.destroy = function () {
        var e_3, _a;
        this._data = undefined;
        removeAllChildren(this._detailRight);
        removeAllChildren(this._progessWrapper);
        this._detailRight = undefined;
        this._progessWrapper = undefined;
        try {
            for (var _b = __values(this._legendItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                remove(item);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this._legendItems = undefined;
        this._legend = undefined;
    };
    /**
     * @deprecated use destroy() instead.
     * @todo remove in version 2.0.0
     */
    BarChartHorizontal.prototype.destory = function () {
        this.destroy();
    };
    return BarChartHorizontal;
}(DomElement));
export function init() {
    searchAndInitialize(".bar-chart-horizontal", function (e) {
        new BarChartHorizontal(e);
    });
}
export default BarChartHorizontal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2NoYXJ0cy9CYXJDaGFydEhvcml6b250YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sVUFBVSxNQUFNLGVBQWUsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGtCQUFrQixDQUFBO0FBRWpILE9BQU8sS0FBSyxNQUFNLFNBQVMsQ0FBQTtBQUUzQixJQUFNLGtCQUFrQixHQUFHLGVBQWUsQ0FBQTtBQUMxQyxJQUFNLG1CQUFtQixHQUFHLGdCQUFnQixDQUFBO0FBQzVDLElBQU0sY0FBYyxHQUFHLHNCQUFzQixDQUFBO0FBRTdDLElBQU0sZUFBZSxHQUFHLGlDQUFpQyxDQUFBO0FBQ3pELElBQU0sYUFBYSxHQUFHLCtCQUErQixDQUFBO0FBRXJELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFBO0FBQ2xDLElBQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFBO0FBRWhDLElBQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQTtBQUNuQyxJQUFNLHVCQUF1QixHQUFHLG1CQUFtQixDQUFBO0FBRW5ELElBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQTtBQUMvQixJQUFNLHVCQUF1QixHQUFHLG9CQUFvQixDQUFBO0FBRXBELElBQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFBO0FBRTlCOztHQUVHO0FBQ0g7SUFBaUMsc0NBQXVCO0lBZ0J0RDs7O09BR0c7SUFDSCw0QkFBWSxPQUFvQixFQUFFLElBQWdCO1FBQWxELFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBU2Y7UUFQQyxJQUFJLElBQUksRUFBRTtZQUNSLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1NBQ2xCO1FBRUQsS0FBSSxD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LENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0E5U0EsQUE4U0MsQ0E5U2dDLFVBQVUsR0E4UzFDO0FBRUQsTUFBTSxVQUFVLElBQUk7SUFDbEIsbUJBQW1CLENBQWMsdUJBQXVCLEVBQUUsVUFBQyxDQUFDO1FBQzFELElBQUksa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDM0IsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxrQkFBa0IsQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9jaGFydHMvQmFyQ2hhcnRIb3Jpem9udGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERvbUVsZW1lbnQgZnJvbSBcIi4uL0RvbUVsZW1lbnRcIlxuaW1wb3J0IHsgc2VhcmNoQW5kSW5pdGlhbGl6ZSwgcmVtb3ZlIH0gZnJvbSBcIi4uL1V0aWxzXCJcbmltcG9ydCB7IGdldEF0dHJpYnV0ZVJlZmVyZW5jZSB9IGZyb20gXCIuLi9Eb21GdW5jdGlvbnNcIlxuaW1wb3J0IHsgdHJ5R2V0RGF0YSwgY3JlYXRlTGVnZW5kSXRlbSwgaXNDb2xvciwgcmVtb3ZlQWxsQ2hpbGRyZW4sIENoYXJ0RGF0YSwgQ2hhcnRBeGlzIH0gZnJvbSBcIi4vQ2hhcnRGdW5jdGlvbnNcIlxuXG5pbXBvcnQgYW5pbWUgZnJvbSBcImFuaW1lanNcIlxuXG5jb25zdCBRVUVSWV9ERVRBSUxfUklHSFQgPSBcIi5kZXRhaWwtcmlnaHRcIlxuY29uc3QgUVVFUllfREVUQUlMX0JPVFRPTSA9IFwiLmRldGFpbC1ib3R0b21cIlxuY29uc3QgUVVFUllfUFJPR1JFU1MgPSBcIi5iYXItY2hhcnRfX3Byb2dyZXNzXCJcblxuY29uc3QgQ0xBU1NfVU5MSU1JVEVEID0gXCJiYXItY2hhcnQtaG9yaXpvbnRhbC0tdW5saW1pdGVkXCJcbmNvbnN0IENMQVNTX0xJTUlURUQgPSBcImJhci1jaGFydC1ob3Jpem9udGFsLS1saW1pdGVkXCJcblxuY29uc3QgQ0xBU1NfREVUQUlMX1ZBTFVFID0gXCJ2YWx1ZVwiXG5jb25zdCBDTEFTU19ERVRBSUxfVU5JVCA9IFwidW5pdFwiXG5cbmNvbnN0IENMQVNTX0lORElDQVRPUiA9IFwiaW5kaWNhdG9yXCJcbmNvbnN0IENMQVNTX0lORElDQVRPUl9XUkFQUEVSID0gXCJpbmRpY2F0b3Itd3JhcHBlclwiXG5cbmNvbnN0IENMQVNTX1RPT0xUSVAgPSBcInRvb2x0aXBcIlxuY29uc3QgQ0xBU1NfVE9PTFRJUF9NVUxUSUxJTkUgPSBcInRvb2x0aXAtLW11bHRpbGluZVwiXG5cbmNvbnN0IEFOSU1BVElPTl9EVVJBVElPTiA9IDUwMFxuXG4vKipcbiAqIEJhciBDaGFydCBIb3Jpem9udGFsIENvbXBvbmVudC5cbiAqL1xuY2xhc3MgQmFyQ2hhcnRIb3Jpem9udGFsIGV4dGVuZHMgRG9tRWxlbWVudDxIVE1MRWxlbWVudD4ge1xuICBwcml2YXRlIF9kYXRhITogQ2hhcnREYXRhXG5cbiAgcHJpdmF0ZSBfbGVnZW5kSXRlbXM6IEhUTUxFbGVtZW50W11cbiAgcHJpdmF0ZSBfcHJvZ2Vzc1dyYXBwZXIhOiBIVE1MRWxlbWVudFxuXG4gIHByaXZhdGUgX3VuaXQhOiBzdHJpbmdcbiAgcHJpdmF0ZSBfbWF4VmFsdWUhOiBudW1iZXJcbiAgcHJpdmF0ZSBfcHJlY2lzaW9uITogbnVtYmVyXG5cbiAgcHJpdmF0ZSBfaXNVbmxpbWl0ZWQhOiBib29sZWFuXG4gIHByaXZhdGUgX2lzTGltaXRlZCE6IGJvb2xlYW5cblxuICBwcml2YXRlIF9kZXRhaWxSaWdodCE6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgX2xlZ2VuZCE6IEhUTUxFbGVtZW50XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSBiYXIgY2hhcnQgaG9yaXpvbnRhbCBjb21wb25lbnQuXG4gICAqIEBwYXJhbSB7RG9tRWxlbWVudH0gLSByb290IGVsZW1lbnQgb2YgdGhlIGNoYXJ0LlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGRhdGE/OiBDaGFydERhdGEpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBkYXRhXG4gICAgfVxuXG4gICAgdGhpcy5fbGVnZW5kSXRlbXMgPSBbXVxuXG4gICAgdGhpcy5faW5pdGlhbGl6ZSgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2luaXRpYWxpemUoKSB7XG4gICAgdGhpcy5fdW5pdCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS11bml0XCIpIHx8IFwiXCJcbiAgICB0aGlzLl9tYXhWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1heFwiKSEpXG4gICAgdGhpcy5fcHJlY2lzaW9uID0gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByZWNpc2lvblwiKSEsIDEwKSB8fCAwXG5cbiAgICB0aGlzLl9pc1VubGltaXRlZCA9IHRoaXMuaGFzQ2xhc3MoQ0xBU1NfVU5MSU1JVEVEKVxuICAgIHRoaXMuX2lzTGltaXRlZCA9IHRoaXMuaGFzQ2xhc3MoQ0xBU1NfTElNSVRFRClcblxuICAgIHRoaXMuX3Byb2dlc3NXcmFwcGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoUVVFUllfUFJPR1JFU1MpISBhcyBIVE1MRWxlbWVudFxuXG4gICAgaWYgKHRoaXMuX2lzTGltaXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fZGV0YWlsUmlnaHQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihRVUVSWV9ERVRBSUxfQk9UVE9NKSEgYXMgSFRNTEVsZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGV0YWlsUmlnaHQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihRVUVSWV9ERVRBSUxfUklHSFQpISBhcyBIVE1MRWxlbWVudFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9pc1VubGltaXRlZCA9PT0gZmFsc2UgJiYgdGhpcy5faXNMaW1pdGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5fbGVnZW5kID0gZ2V0QXR0cmlidXRlUmVmZXJlbmNlKHRoaXMuZWxlbWVudCwgXCJkYXRhLWxlZ2VuZFwiKSFcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2RhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0cnlHZXREYXRhKHRoaXMuZWxlbWVudClcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXIoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9yZW5kZXIoKSB7XG4gICAgbGV0IGRhdGFPbmUgPSB0aGlzLl9kYXRhWzBdXG4gICAgbGV0IGRhdGFUd28gPSB0aGlzLl9kYXRhWzFdXG5cbiAgICBsZXQgdG9vbHRpcCA9IHRoaXMuX2lzTGltaXRlZCA9PT0gZmFsc2UgPyB0aGlzLl9nZXRUb29sdGlwQ29udGVudCh0aGlzLl9kYXRhKSA6IHVuZGVmaW5lZFxuXG4gICAgbGV0IGFuaW1hdGVkVmFsdWVFbGVtZW50OiBFbGVtZW50IHwgdW5kZWZpbmVkXG5cbiAgICAvLyBDbGVhbnVwXG4gICAgcmVtb3ZlQWxsQ2hpbGRyZW4odGhpcy5fZGV0YWlsUmlnaHQpXG4gICAgcmVtb3ZlQWxsQ2hpbGRyZW4odGhpcy5fcHJvZ2Vzc1dyYXBwZXIpXG5cbiAgICAvLyBDbGVhciBvbmx5IG93biBsZWdlbmQgaXRlbXNcbiAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuX2xlZ2VuZEl0ZW1zKSB7XG4gICAgICByZW1vdmUoaXRlbSlcbiAgICB9XG4gICAgdGhpcy5fbGVnZW5kSXRlbXMgPSBbXVxuXG4gICAgaWYgKGRhdGFPbmUpIHtcbiAgICAgIGlmICh0aGlzLl9pc1VubGltaXRlZCA9PT0gZmFsc2UgfHwgKHRoaXMuX2lzVW5saW1pdGVkID09PSB0cnVlICYmICFkYXRhVHdvKSkge1xuXG4gICAgICAgIGxldCB2YWxFbGVtZW50ID0gYW5pbWF0ZWRWYWx1ZUVsZW1lbnQgPSB0aGlzLl9jcmVhdGVWYWx1ZUVsZW1lbnQoZGF0YU9uZSlcbiAgICAgICAgdGhpcy5fZGV0YWlsUmlnaHQuYXBwZW5kQ2hpbGQodmFsRWxlbWVudClcblxuICAgICAgICBpZiAodGhpcy5faXNMaW1pdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnN0IHNlcGFyYXRvckVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudChcImRpdlwiKVxuICAgICAgICAgICAgLmFkZENsYXNzKENMQVNTX0RFVEFJTF9VTklUKVxuICAgICAgICAgICAgLmVsZW1lbnQgYXMgSFRNTEVsZW1lbnRcbiAgICAgICAgICBzZXBhcmF0b3JFbGVtZW50LmlubmVyVGV4dCA9IGAgJHt0aGlzLl91bml0fWBcblxuICAgICAgICAgIHRoaXMuX2RldGFpbFJpZ2h0LmFwcGVuZENoaWxkKHNlcGFyYXRvckVsZW1lbnQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHRoZSBpbmRpY2F0b3JcbiAgICAgIGxldCBpbmRpY2F0b3IgPSB0aGlzLl9hZGRJbmRpY2F0b3IoZGF0YU9uZSwgdG9vbHRpcClcbiAgICAgIHRoaXMuX2FuaW1hdGVJbmRpY2F0b3IoaW5kaWNhdG9yLCAwKVxuXG4gICAgICAvLyBBbmltYXRlIHRoZSB2YWx1ZSBpZiByZXF1aXJlZFxuICAgICAgaWYgKGFuaW1hdGVkVmFsdWVFbGVtZW50ICYmIHRoaXMuX2lzTGltaXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9hbmltYXRlVmFsdWVFbGVtZW50KGFuaW1hdGVkVmFsdWVFbGVtZW50IGFzIEhUTUxFbGVtZW50LCBkYXRhT25lLnZhbHVlKVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdGhlIGxlZ2VuZFxuICAgICAgaWYgKHRoaXMuX2xlZ2VuZCkge1xuICAgICAgICBjb25zdCBsZWdlbmRJdGVtID0gY3JlYXRlTGVnZW5kSXRlbShkYXRhT25lKVxuICAgICAgICB0aGlzLl9sZWdlbmQuYXBwZW5kQ2hpbGQobGVnZW5kSXRlbSlcbiAgICAgICAgdGhpcy5fbGVnZW5kSXRlbXMucHVzaChsZWdlbmRJdGVtKVxuXG4gICAgICAgIHRoaXMuX2FuaW1hdGVMZWdlbmQobGVnZW5kSXRlbSwgMClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YVR3bykge1xuICAgICAgbGV0IHZhbEVsZW1lbnQgPSB0aGlzLl9jcmVhdGVWYWx1ZUVsZW1lbnQoZGF0YVR3bylcblxuICAgICAgbGV0IHVuaXRFbGVtZW50ID0gbmV3IERvbUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLmFkZENsYXNzKENMQVNTX0RFVEFJTF9VTklUKVxuICAgICAgICAuZWxlbWVudCBhcyBIVE1MRWxlbWVudFxuICAgICAgdW5pdEVsZW1lbnQuaW5uZXJUZXh0ID0gYCAke3RoaXMuX3VuaXR9YFxuXG4gICAgICB0aGlzLl9kZXRhaWxSaWdodC5hcHBlbmRDaGlsZCh2YWxFbGVtZW50KVxuICAgICAgdGhpcy5fZGV0YWlsUmlnaHQuYXBwZW5kQ2hpbGQodW5pdEVsZW1lbnQpXG5cbiAgICAgIC8vIEFkZCB0aGUgaW5kaWNhdG9yXG4gICAgICBsZXQgaW5kaWNhdG9yID0gdGhpcy5fYWRkSW5kaWNhdG9yKGRhdGFUd28sIHRvb2x0aXApXG4gICAgICB0aGlzLl9hbmltYXRlSW5kaWNhdG9yKGluZGljYXRvciwgQU5JTUFUSU9OX0RVUkFUSU9OKVxuXG4gICAgICAvLyBBZGQgdGhlIGxlZ2VuZFxuICAgICAgaWYgKHRoaXMuX2xlZ2VuZCkge1xuICAgICAgICBjb25zdCBsZWdlbmRJdGVtID0gY3JlYXRlTGVnZW5kSXRlbShkYXRhVHdvKVxuICAgICAgICB0aGlzLl9sZWdlbmQuYXBwZW5kQ2hpbGQobGVnZW5kSXRlbSlcbiAgICAgICAgdGhpcy5fbGVnZW5kSXRlbXMucHVzaChsZWdlbmRJdGVtKVxuXG4gICAgICAgIHRoaXMuX2FuaW1hdGVMZWdlbmQobGVnZW5kSXRlbSwgQU5JTUFUSU9OX0RVUkFUSU9OKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9pc0xpbWl0ZWQgPT09IHRydWUpIHtcbiAgICAgIGxldCB2YWxFbGVtZW50ID0gdGhpcy5fY3JlYXRlVmFsdWVFbGVtZW50KHsgdmFsdWU6IHRoaXMuX21heFZhbHVlIH0pXG5cbiAgICAgIGxldCB1bml0RWxlbWVudCA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC5hZGRDbGFzcyhDTEFTU19ERVRBSUxfVU5JVClcbiAgICAgICAgLmVsZW1lbnQgYXMgSFRNTEVsZW1lbnRcbiAgICAgIHVuaXRFbGVtZW50LmlubmVyVGV4dCA9IGAgJHt0aGlzLl91bml0fWBcblxuICAgICAgdGhpcy5fZGV0YWlsUmlnaHQuYXBwZW5kQ2hpbGQodmFsRWxlbWVudClcbiAgICAgIHRoaXMuX2RldGFpbFJpZ2h0LmFwcGVuZENoaWxkKHVuaXRFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGVWYWx1ZUVsZW1lbnQoYW5pbWF0ZWRWYWx1ZUVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0b1ZhbHVlOiBudW1iZXIpIHtcbiAgICBsZXQgY291bnRlciA9IHsgdmFyOiAwIH1cbiAgICBhbmltZSh7XG4gICAgICB0YXJnZXRzOiBjb3VudGVyLFxuICAgICAgdmFyOiB0b1ZhbHVlLFxuICAgICAgZHVyYXRpb246IEFOSU1BVElPTl9EVVJBVElPTixcbiAgICAgIGVhc2luZzogXCJlYXNlT3V0UXVpbnRcIixcbiAgICAgIHJvdW5kOiAxLFxuICAgICAgdXBkYXRlOiAoKSA9PiB7XG4gICAgICAgIGFuaW1hdGVkVmFsdWVFbGVtZW50IS5pbm5lclRleHQgPSBgJHtjb3VudGVyLnZhcn1gXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGVJbmRpY2F0b3IoaW5kaWNhdG9yV3JhcHBlcjogSFRNTEVsZW1lbnQsIGFuaW1hdGlvbk9mZnNldDogbnVtYmVyKSB7XG4gICAgY29uc3QgaW5kaWNhdG9yID0gaW5kaWNhdG9yV3JhcHBlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW5kaWNhdG9yXCIpWzBdIGFzIEhUTUxFbGVtZW50XG4gICAgY29uc3QgaW5kaWNhdG9yV2lkdGggPSBpbmRpY2F0b3Iuc2Nyb2xsV2lkdGhcbiAgICBpbmRpY2F0b3Iuc3R5bGUud2lkdGggPSBcIjBweFwiXG5cbiAgICBhbmltZSh7XG4gICAgICB0YXJnZXRzOiBpbmRpY2F0b3IsXG4gICAgICBkdXJhdGlvbjogQU5JTUFUSU9OX0RVUkFUSU9OLFxuICAgICAgd2lkdGg6IGluZGljYXRvcldpZHRoICsgXCJweFwiLFxuICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFF1aW50XCIsXG4gICAgICBkZWxheTogYW5pbWF0aW9uT2Zmc2V0LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgaW5kaWNhdG9yLnN0eWxlLndpZHRoID0gXCJcIlxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRlTGVnZW5kKGxlZ2VuZEl0ZW06IEhUTUxFbGVtZW50LCBhbmltYXRpb25PZmZzZXQ6IG51bWJlcikge1xuICAgIGxlZ2VuZEl0ZW0uc3R5bGUub3BhY2l0eSA9IFwiMFwiXG4gICAgYW5pbWUoe1xuICAgICAgdGFyZ2V0czogbGVnZW5kSXRlbSxcbiAgICAgIGR1cmF0aW9uOiBBTklNQVRJT05fRFVSQVRJT04sXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFF1aW50XCIsXG4gICAgICBkZWxheTogYW5pbWF0aW9uT2Zmc2V0LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgbGVnZW5kSXRlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVWYWx1ZUVsZW1lbnQoZGF0YTogeyB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIH0pIHtcbiAgICBsZXQgdW5saW1pdGVkUHJlZml4ID0gXCJcIlxuXG4gICAgaWYgKHRoaXMuX2lzVW5saW1pdGVkID09PSB0cnVlKSB7XG4gICAgICB1bmxpbWl0ZWRQcmVmaXggPSBcIitcIlxuICAgIH1cblxuICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gcGFyc2VGbG9hdCgoZGF0YS52YWx1ZSBhcyBzdHJpbmcpKVxuXG4gICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgIGlmICh0aGlzLl9wcmVjaXNpb24gPT09IDApIHtcbiAgICAgICAgdmFsdWUgPSBcIjBcIlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBcIi5cIlxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcHJlY2lzaW9uOyBpKyspIHtcbiAgICAgICAgICB2YWx1ZSArPSBcIjBcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudG9GaXhlZCh0aGlzLl9wcmVjaXNpb24pXG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWVFbGVtZW50ID0gbmV3IERvbUVsZW1lbnQoXCJkaXZcIilcbiAgICAgIC5hZGRDbGFzcyhDTEFTU19ERVRBSUxfVkFMVUUpXG4gICAgICAuZWxlbWVudCBhcyBIVE1MRWxlbWVudFxuICAgIHZhbHVlRWxlbWVudC5pbm5lclRleHQgPSBgJHt1bmxpbWl0ZWRQcmVmaXh9JHt2YWx1ZX1gXG4gICAgcmV0dXJuIHZhbHVlRWxlbWVudFxuICB9XG5cbiAgcHJvdGVjdGVkIF9hZGRJbmRpY2F0b3IoZGF0YTogQ2hhcnRBeGlzLCB0b29sdGlwPzogc3RyaW5nKSB7XG4gICAgbGV0IHdpZHRoID0gKCgxMDAuMCAvIHRoaXMuX21heFZhbHVlKSAqIGRhdGEudmFsdWUpXG5cbiAgICBsZXQgaW5kaWNhdG9yID0gbmV3IERvbUVsZW1lbnQoXCJkaXZcIilcbiAgICAgIC5hZGRDbGFzcyhDTEFTU19JTkRJQ0FUT1IpXG5cbiAgICBpZiAoaXNDb2xvcihkYXRhLmNvbG9yKSA9PT0gdHJ1ZSkge1xuICAgICAgaW5kaWNhdG9yLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBiYWNrZ3JvdW5kLWNvbG9yOiAke2RhdGEuY29sb3J9O2ApXG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGljYXRvci5hZGRDbGFzcyhkYXRhLmNvbG9yKVxuICAgIH1cblxuICAgIGxldCBpbmRpY2F0b3JXcmFwcGVyID0gbmV3IERvbUVsZW1lbnQoXCJkaXZcIilcbiAgICAgIC5hZGRDbGFzcyhDTEFTU19JTkRJQ0FUT1JfV1JBUFBFUilcbiAgICAgIC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgd2lkdGg6ICR7d2lkdGh9JWApXG4gICAgICAuYXBwZW5kQ2hpbGQoaW5kaWNhdG9yKVxuICAgICAgLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJ2b2lkKDApXCIpXG5cbiAgICBpZiAodG9vbHRpcCAmJiB0b29sdGlwICE9PSBcIlwiKSB7XG4gICAgICBpbmRpY2F0b3JXcmFwcGVyXG4gICAgICAgIC5hZGRDbGFzcyhDTEFTU19UT09MVElQKVxuICAgICAgICAuYWRkQ2xhc3MoQ0xBU1NfVE9PTFRJUF9NVUxUSUxJTkUpXG4gICAgICAgIC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHRvb2x0aXApXG4gICAgfVxuXG4gICAgdGhpcy5fcHJvZ2Vzc1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW5kaWNhdG9yV3JhcHBlci5lbGVtZW50KVxuICAgIHJldHVybiBpbmRpY2F0b3JXcmFwcGVyLmVsZW1lbnQgYXMgSFRNTEVsZW1lbnRcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0VG9vbHRpcENvbnRlbnQoZGF0YUxpc3Q6IENoYXJ0RGF0YSkge1xuICAgIGxldCB0b29sdGlwID0gXCJcIlxuICAgIGZvciAobGV0IGRhdGEgb2YgZGF0YUxpc3QpIHtcbiAgICAgIHRvb2x0aXAgKz0gYCR7ZGF0YS50aXRsZX06ICR7ZGF0YS52YWx1ZX0gJHt0aGlzLl91bml0fVxcbmBcbiAgICB9XG5cbiAgICByZXR1cm4gdG9vbHRpcC50cmltKClcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBiYXIgY2hhcnQgd2l0aCB0aGUgc3BlY2lmaWVkIGRhdGEgZGVmaW5pdGlvbnMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IC0gYmFyIGNoYXJ0IGRhdGEgZGVmaW5pdGlvbnMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRhdGE6IENoYXJ0RGF0YSkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLl9kYXRhID0gZGF0YVxuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcigpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgZXZlbnQgaGFuZGxlcnMgYW5kIGNsZWFycyByZWZlcmVuY2VzLlxuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgKHRoaXMgYXMgYW55KS5fZGF0YSA9IHVuZGVmaW5lZFxuXG4gICAgcmVtb3ZlQWxsQ2hpbGRyZW4odGhpcy5fZGV0YWlsUmlnaHQpXG4gICAgcmVtb3ZlQWxsQ2hpbGRyZW4odGhpcy5fcHJvZ2Vzc1dyYXBwZXIpO1xuXG4gICAgKHRoaXMgYXMgYW55KS5fZGV0YWlsUmlnaHQgPSB1bmRlZmluZWQ7XG4gICAgKHRoaXMgYXMgYW55KS5fcHJvZ2Vzc1dyYXBwZXIgPSB1bmRlZmluZWRcblxuICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5fbGVnZW5kSXRlbXMpIHtcbiAgICAgIHJlbW92ZShpdGVtKVxuICAgIH1cblxuICAgICh0aGlzIGFzIGFueSkuX2xlZ2VuZEl0ZW1zID0gdW5kZWZpbmVkO1xuICAgICh0aGlzIGFzIGFueSkuX2xlZ2VuZCA9IHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSBkZXN0cm95KCkgaW5zdGVhZC5cbiAgICogQHRvZG8gcmVtb3ZlIGluIHZlcnNpb24gMi4wLjBcbiAgICovXG4gIHB1YmxpYyBkZXN0b3J5KCkge1xuICAgIHRoaXMuZGVzdHJveSgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHNlYXJjaEFuZEluaXRpYWxpemU8SFRNTEVsZW1lbnQ+KFwiLmJhci1jaGFydC1ob3Jpem9udGFsXCIsIChlKSA9PiB7XG4gICAgbmV3IEJhckNoYXJ0SG9yaXpvbnRhbChlKVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXJDaGFydEhvcml6b250YWxcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
