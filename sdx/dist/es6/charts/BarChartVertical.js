import { __extends, __values } from "tslib";
import DomElement from "../DomElement";
import { searchAndInitialize } from "../Utils";
import { text } from "../DomFunctions";
import { createLegendItem, isColor, removeAllChildren } from "./ChartFunctions";
import anime from "animejs";
var QUERY_DATA_CATEGORIES = ".js-data-list .js-category";
var QUERY_DATA_ITEMS = ".js-data-list .js-data";
var QUERY_CHART = ".js-chart";
var QUERY_LEGEND = ".bar-chart__legend";
var CLASS_INDICATOR = "indicator";
var CLASS_LABEL_X = "axis-x-label";
var CLASS_INDICATOR_WRAPPER = "indicator-wrapper";
var CLASS_INDICATOR_INNER_WRAPPER = "indicator-wrapper-inner";
var CLASS_INDICATOR_EMPTY = "empty";
var CLASS_TOOLTIP = "tooltip";
var CLASS_TOOLTIP_LEFT = "tooltip--left";
var CLASS_TOOLTIP_RIGHT = "tooltip--right";
var CLASS_TOOLTIP_MULTILINE = "tooltip--multiline";
var ANIMATION_DURATION = 500;
/**
 * Bar Chart Horizontal Component.
 */
var BarChartVertical = /** @class */ (function (_super) {
    __extends(BarChartVertical, _super);
    /**
     * Creates and initializes the bar chart horizontal component.
     * @param element - root element of the chart.
     * @param data - data for the chart.
     */
    function BarChartVertical(element, data) {
        var _this = _super.call(this, element) || this;
        if (data) {
            _this._data = data;
        }
        _this._initialize();
        return _this;
    }
    BarChartVertical.prototype._initialize = function () {
        this._unit = this.getAttribute("data-unit") || "";
        this._maxValue = parseFloat(this.getAttribute("data-max")) || 100;
        this._chart = this.element.querySelector(QUERY_CHART);
        this._legend = this.element.querySelector(QUERY_LEGEND);
        if (!this._data) {
            this._data = this._tryGetData(this.element);
        }
        this._render();
    };
    BarChartVertical.prototype._tryGetData = function (element) {
        var e_1, _a, e_2, _b, e_3, _c;
        var data = {
            categories: [],
            items: []
        };
        var categories = element.querySelectorAll(QUERY_DATA_CATEGORIES);
        var items = element.querySelectorAll(QUERY_DATA_ITEMS);
        try {
            for (var categories_1 = __values(categories), categories_1_1 = categories_1.next(); !categories_1_1.done; categories_1_1 = categories_1.next()) {
                var category = categories_1_1.value;
                data.categories.push({
                    title: text(category),
                    color: category.getAttribute("data-color")
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (categories_1_1 && !categories_1_1.done && (_a = categories_1.return)) _a.call(categories_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                var dataEnty = {
                    title: text(item),
                    class: item.getAttribute("data-class"),
                    values: []
                };
                var vals = item.getAttribute("data-value");
                if (vals) {
                    try {
                        for (var _d = (e_3 = void 0, __values(vals.split(","))), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var val = _e.value;
                            dataEnty.values.push(parseFloat(val));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                data.items.push(dataEnty);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_b = items_1.return)) _b.call(items_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return data;
    };
    BarChartVertical.prototype._getTooltipContent = function (entry, categories) {
        var tooltip = "";
        for (var i = 0; i < entry.values.length; i++) {
            tooltip += categories[i].title + ": " + entry.values[i] + " " + this._unit + "\n";
        }
        return tooltip.trim();
    };
    BarChartVertical.prototype._render = function () {
        var e_4, _a, e_5, _b;
        if (this._legend) {
            removeAllChildren(this._legend);
            try {
                for (var _c = __values(this._data.categories), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var category = _d.value;
                    var legendItem = createLegendItem(category);
                    this._legend.appendChild(legendItem);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        removeAllChildren(this._chart);
        var animationStages = [];
        var leftSideItems = Math.floor(this._data.items.length / 2);
        try {
            for (var _e = __values(this._data.items), _f = _e.next(); !_f.done; _f = _e.next()) {
                var item = _f.value;
                var element = new DomElement("li");
                if (item.class) {
                    element.addClass(item.class);
                }
                var listElement = new DomElement("ul")
                    .addClass(CLASS_INDICATOR_WRAPPER);
                var wrapper = new DomElement("div")
                    .addClass(CLASS_INDICATOR_INNER_WRAPPER);
                listElement.appendChild(wrapper);
                element.appendChild(listElement);
                var tooltip = this._getTooltipContent(item, this._data.categories);
                if (tooltip) {
                    wrapper
                        .addClass(CLASS_TOOLTIP)
                        .addClass(leftSideItems <= 0 ? CLASS_TOOLTIP_LEFT : CLASS_TOOLTIP_RIGHT)
                        .setAttribute("aria-label", tooltip);
                    if (item.values.length > 1) {
                        wrapper.addClass(CLASS_TOOLTIP_MULTILINE);
                    }
                }
                for (var i = 0; i < item.values.length; i++) {
                    var height = (this._chart.offsetHeight / this._maxValue) * item.values[i];
                    var indicator = new DomElement("li")
                        .addClass(CLASS_INDICATOR)
                        .setAttribute("style", "height: " + height + "px;");
                    if (height > 0) {
                        var color = this._data.categories[i].color;
                        if (isColor(color)) {
                            indicator.setAttribute("style", "background-color: " + color + ";");
                        }
                        else {
                            indicator.addClass(color);
                        }
                        if (animationStages.length <= i) {
                            animationStages.push([]);
                        }
                        animationStages[i].push(indicator.element);
                    }
                    else {
                        indicator.addClass(CLASS_INDICATOR_EMPTY);
                    }
                    wrapper.appendChild(indicator);
                }
                var titleDomElement = new DomElement("div")
                    .addClass(CLASS_LABEL_X);
                var titleElement = titleDomElement.element;
                titleElement.innerText = item.title;
                element.appendChild(titleDomElement);
                this._chart.appendChild(element.element);
                leftSideItems -= 1;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_5) throw e_5.error; }
        }
        for (var i = 0; i < animationStages.length; i++) {
            var offset = ANIMATION_DURATION * i;
            this._animateBars(animationStages[i], offset);
            if (this._legend) {
                this._animateLegend(this._legend.children[i], offset);
            }
        }
    };
    BarChartVertical.prototype._animateBars = function (bars, animationOffset) {
        for (var i = 0; i < bars.length; i++) {
            var bar = bars[i];
            var barHeight = bar.style.height;
            bar.style.height = "0";
            anime({
                targets: bars[i],
                height: barHeight,
                easing: "easeInOutQuint",
                duration: ANIMATION_DURATION,
                delay: animationOffset
            });
        }
    };
    BarChartVertical.prototype._animateLegend = function (legend, animationOffset) {
        legend.style.opacity = "0";
        anime({
            targets: legend,
            opacity: 1,
            easing: "easeInOutQuint",
            duration: ANIMATION_DURATION,
            delay: animationOffset
        });
    };
    /**
     * Updates the bar chart with the specified data definitions.
     * @param {Array} - bar chart data definitions.
     */
    BarChartVertical.prototype.update = function (data) {
        if (data) {
            this._data = data;
        }
        this._render();
    };
    /**
     * Removes all event handlers and clears references.
     */
    BarChartVertical.prototype.destroy = function () {
        this._data = undefined;
        if (this._legend) {
            removeAllChildren(this._legend);
            this._legend = undefined;
        }
    };
    /**
     * @deprecated use destroy() instead.
     * @todo remove in version 2.0.0
     */
    BarChartVertical.prototype.destory = function () {
        this.destroy();
    };
    return BarChartVertical;
}(DomElement));
export function init() {
    searchAndInitialize(".bar-chart-vertical", function (e) {
        new BarChartVertical(e);
    });
}
export default BarChartVertical;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2NoYXJ0cy9CYXJDaGFydFZlcnRpY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFDdEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFjLE1BQU0sa0JBQWtCLENBQUE7QUFFM0YsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFBO0FBRTNCLElBQU0scUJBQXFCLEdBQUcsNEJBQTRCLENBQUE7QUFDMUQsSUFBTSxnQkFBZ0IsR0FBRyx3QkFBd0IsQ0FBQTtBQUNqRCxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUE7QUFDL0IsSUFBTSxZQUFZLEdBQUcsb0JBQW9CLENBQUE7QUFFekMsSUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFBO0FBQ25DLElBQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQTtBQUNwQyxJQUFNLHVCQUF1QixHQUFHLG1CQUFtQixDQUFBO0FBQ25ELElBQU0sNkJBQTZCLEdBQUcseUJBQXlCLENBQUE7QUFDL0QsSUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUE7QUFFckMsSUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFBO0FBQy9CLElBQU0sa0JBQWtCLEdBQUcsZUFBZSxDQUFBO0FBQzFDLElBQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUE7QUFDNUMsSUFBTSx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQTtBQUVwRCxJQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQTtBQWdCOUI7O0dBRUc7QUFDSDtJQUErQixvQ0FBdUI7SUFTcEQ7Ozs7T0FJRztJQUNILDBCQUFZLE9BQW9CLEVBQUUsSUFBZ0I7UUFBbEQsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FPZjtRQUxDLElBQUksSUFBSSxFQUFFO1lBQ1IsS0FB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QUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQ0FBTSxHQUFiLFVBQWMsSUFBZTtRQUMzQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNJLGtDQUFPLEdBQWQ7UUFDRyxJQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQTtRQUUvQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLElBQVksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFBO1NBQ2xDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGtDQUFPLEdBQWQ7UUFDRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0F6T0EsQUF5T0MsQ0F6TzhCLFVBQVUsR0F5T3hDO0FBRUQsTUFBTSxVQUFVLElBQUk7SUFDbEIsbUJBQW1CLENBQWMscUJBQXFCLEVBQUUsVUFBQyxDQUFDO1FBQ3hELElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDekIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxnQkFBZ0IsQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9jaGFydHMvQmFyQ2hhcnRWZXJ0aWNhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEb21FbGVtZW50IGZyb20gXCIuLi9Eb21FbGVtZW50XCJcbmltcG9ydCB7IHNlYXJjaEFuZEluaXRpYWxpemUgfSBmcm9tIFwiLi4vVXRpbHNcIlxuaW1wb3J0IHsgdGV4dCB9IGZyb20gXCIuLi9Eb21GdW5jdGlvbnNcIlxuaW1wb3J0IHsgY3JlYXRlTGVnZW5kSXRlbSwgaXNDb2xvciwgcmVtb3ZlQWxsQ2hpbGRyZW4sIENoYXJ0TGFiZWwgfSBmcm9tIFwiLi9DaGFydEZ1bmN0aW9uc1wiXG5cbmltcG9ydCBhbmltZSBmcm9tIFwiYW5pbWVqc1wiXG5cbmNvbnN0IFFVRVJZX0RBVEFfQ0FURUdPUklFUyA9IFwiLmpzLWRhdGEtbGlzdCAuanMtY2F0ZWdvcnlcIlxuY29uc3QgUVVFUllfREFUQV9JVEVNUyA9IFwiLmpzLWRhdGEtbGlzdCAuanMtZGF0YVwiXG5jb25zdCBRVUVSWV9DSEFSVCA9IFwiLmpzLWNoYXJ0XCJcbmNvbnN0IFFVRVJZX0xFR0VORCA9IFwiLmJhci1jaGFydF9fbGVnZW5kXCJcblxuY29uc3QgQ0xBU1NfSU5ESUNBVE9SID0gXCJpbmRpY2F0b3JcIlxuY29uc3QgQ0xBU1NfTEFCRUxfWCA9IFwiYXhpcy14LWxhYmVsXCJcbmNvbnN0IENMQVNTX0lORElDQVRPUl9XUkFQUEVSID0gXCJpbmRpY2F0b3Itd3JhcHBlclwiXG5jb25zdCBDTEFTU19JTkRJQ0FUT1JfSU5ORVJfV1JBUFBFUiA9IFwiaW5kaWNhdG9yLXdyYXBwZXItaW5uZXJcIlxuY29uc3QgQ0xBU1NfSU5ESUNBVE9SX0VNUFRZID0gXCJlbXB0eVwiXG5cbmNvbnN0IENMQVNTX1RPT0xUSVAgPSBcInRvb2x0aXBcIlxuY29uc3QgQ0xBU1NfVE9PTFRJUF9MRUZUID0gXCJ0b29sdGlwLS1sZWZ0XCJcbmNvbnN0IENMQVNTX1RPT0xUSVBfUklHSFQgPSBcInRvb2x0aXAtLXJpZ2h0XCJcbmNvbnN0IENMQVNTX1RPT0xUSVBfTVVMVElMSU5FID0gXCJ0b29sdGlwLS1tdWx0aWxpbmVcIlxuXG5jb25zdCBBTklNQVRJT05fRFVSQVRJT04gPSA1MDBcblxuZXhwb3J0IGludGVyZmFjZSBDYXRlZ29yeSBleHRlbmRzIENoYXJ0TGFiZWwge1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFFbnRyeSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgY2xhc3M6IHN0cmluZ1xuICB2YWx1ZXM6IG51bWJlcltdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcnREYXRhIHtcbiAgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXVxuICBpdGVtczogRGF0YUVudHJ5W11cbn1cblxuLyoqXG4gKiBCYXIgQ2hhcnQgSG9yaXpvbnRhbCBDb21wb25lbnQuXG4gKi9cbmNsYXNzIEJhckNoYXJ0VmVydGljYWwgZXh0ZW5kcyBEb21FbGVtZW50PEhUTUxFbGVtZW50PiB7XG4gIHByaXZhdGUgX2RhdGEhOiBDaGFydERhdGFcblxuICBwcml2YXRlIF91bml0ITogc3RyaW5nXG4gIHByaXZhdGUgX21heFZhbHVlITogbnVtYmVyXG5cbiAgcHJpdmF0ZSBfY2hhcnQhOiBIVE1MRWxlbWVudFxuICBwcml2YXRlIF9sZWdlbmQhOiBIVE1MRWxlbWVudFxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyB0aGUgYmFyIGNoYXJ0IGhvcml6b250YWwgY29tcG9uZW50LlxuICAgKiBAcGFyYW0gZWxlbWVudCAtIHJvb3QgZWxlbWVudCBvZiB0aGUgY2hhcnQuXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSBmb3IgdGhlIGNoYXJ0LlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGRhdGE/OiBDaGFydERhdGEpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBkYXRhXG4gICAgfVxuXG4gICAgdGhpcy5faW5pdGlhbGl6ZSgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2luaXRpYWxpemUoKSB7XG4gICAgdGhpcy5fdW5pdCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS11bml0XCIpIHx8IFwiXCJcblxuICAgIHRoaXMuX21heFZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtbWF4XCIpISkgfHwgMTAwXG5cbiAgICB0aGlzLl9jaGFydCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFFVRVJZX0NIQVJUKSEgYXMgSFRNTEVsZW1lbnRcbiAgICB0aGlzLl9sZWdlbmQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihRVUVSWV9MRUdFTkQpISBhcyBIVE1MRWxlbWVudFxuXG4gICAgaWYgKCF0aGlzLl9kYXRhKSB7XG4gICAgICB0aGlzLl9kYXRhID0gdGhpcy5fdHJ5R2V0RGF0YSh0aGlzLmVsZW1lbnQpXG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfdHJ5R2V0RGF0YShlbGVtZW50OiBIVE1MRWxlbWVudCk6IENoYXJ0RGF0YSB7XG4gICAgY29uc3QgZGF0YTogQ2hhcnREYXRhID0ge1xuICAgICAgY2F0ZWdvcmllczogW10sXG4gICAgICBpdGVtczogW11cbiAgICB9XG5cbiAgICBjb25zdCBjYXRlZ29yaWVzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFFVRVJZX0RBVEFfQ0FURUdPUklFUylcbiAgICBjb25zdCBpdGVtcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChRVUVSWV9EQVRBX0lURU1TKVxuXG4gICAgZm9yIChjb25zdCBjYXRlZ29yeSBvZiBjYXRlZ29yaWVzKSB7XG4gICAgICBkYXRhLmNhdGVnb3JpZXMucHVzaChcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiB0ZXh0KGNhdGVnb3J5KSxcbiAgICAgICAgICBjb2xvcjogY2F0ZWdvcnkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb2xvclwiKSFcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgY29uc3QgZGF0YUVudHk6IERhdGFFbnRyeSA9IHtcbiAgICAgICAgdGl0bGU6IHRleHQoaXRlbSksXG4gICAgICAgIGNsYXNzOiBpdGVtLmdldEF0dHJpYnV0ZShcImRhdGEtY2xhc3NcIikhLFxuICAgICAgICB2YWx1ZXM6IFtdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbHMgPSBpdGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIilcbiAgICAgIGlmICh2YWxzKSB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsIG9mIHZhbHMuc3BsaXQoXCIsXCIpKSB7XG4gICAgICAgICAgZGF0YUVudHkudmFsdWVzLnB1c2gocGFyc2VGbG9hdCh2YWwpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRhdGEuaXRlbXMucHVzaChkYXRhRW50eSlcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRUb29sdGlwQ29udGVudChlbnRyeTogRGF0YUVudHJ5LCBjYXRlZ29yaWVzOiBDYXRlZ29yeVtdKSB7XG4gICAgbGV0IHRvb2x0aXAgPSBcIlwiXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyeS52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvb2x0aXAgKz0gYCR7Y2F0ZWdvcmllc1tpXS50aXRsZX06ICR7ZW50cnkudmFsdWVzW2ldfSAke3RoaXMuX3VuaXR9XFxuYFxuICAgIH1cblxuICAgIHJldHVybiB0b29sdGlwLnRyaW0oKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9yZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuX2xlZ2VuZCkge1xuICAgICAgcmVtb3ZlQWxsQ2hpbGRyZW4odGhpcy5fbGVnZW5kKVxuXG4gICAgICBmb3IgKGNvbnN0IGNhdGVnb3J5IG9mIHRoaXMuX2RhdGEuY2F0ZWdvcmllcykge1xuICAgICAgICBjb25zdCBsZWdlbmRJdGVtID0gY3JlYXRlTGVnZW5kSXRlbShjYXRlZ29yeSlcbiAgICAgICAgdGhpcy5fbGVnZW5kLmFwcGVuZENoaWxkKGxlZ2VuZEl0ZW0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsQ2hpbGRyZW4odGhpcy5fY2hhcnQpXG5cbiAgICBjb25zdCBhbmltYXRpb25TdGFnZXM6IEVsZW1lbnRbXVtdID0gW11cblxuICAgIGxldCBsZWZ0U2lkZUl0ZW1zID0gTWF0aC5mbG9vcih0aGlzLl9kYXRhLml0ZW1zLmxlbmd0aCAvIDIpXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2RhdGEuaXRlbXMpIHtcbiAgICAgIGxldCBlbGVtZW50ID0gbmV3IERvbUVsZW1lbnQoXCJsaVwiKVxuXG4gICAgICBpZiAoaXRlbS5jbGFzcykge1xuICAgICAgICBlbGVtZW50LmFkZENsYXNzKGl0ZW0uY2xhc3MpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gbmV3IERvbUVsZW1lbnQoXCJ1bFwiKVxuICAgICAgICAuYWRkQ2xhc3MoQ0xBU1NfSU5ESUNBVE9SX1dSQVBQRVIpXG5cbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBuZXcgRG9tRWxlbWVudChcImRpdlwiKVxuICAgICAgICAuYWRkQ2xhc3MoQ0xBU1NfSU5ESUNBVE9SX0lOTkVSX1dSQVBQRVIpXG4gICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuXG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KVxuXG4gICAgICBjb25zdCB0b29sdGlwID0gdGhpcy5fZ2V0VG9vbHRpcENvbnRlbnQoaXRlbSwgdGhpcy5fZGF0YS5jYXRlZ29yaWVzKVxuICAgICAgaWYgKHRvb2x0aXApIHtcbiAgICAgICAgd3JhcHBlclxuICAgICAgICAgIC5hZGRDbGFzcyhDTEFTU19UT09MVElQKVxuICAgICAgICAgIC5hZGRDbGFzcyhsZWZ0U2lkZUl0ZW1zIDw9IDAgPyBDTEFTU19UT09MVElQX0xFRlQgOiBDTEFTU19UT09MVElQX1JJR0hUKVxuICAgICAgICAgIC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHRvb2x0aXApXG5cbiAgICAgICAgaWYgKGl0ZW0udmFsdWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB3cmFwcGVyLmFkZENsYXNzKENMQVNTX1RPT0xUSVBfTVVMVElMSU5FKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gKHRoaXMuX2NoYXJ0Lm9mZnNldEhlaWdodCAvIHRoaXMuX21heFZhbHVlKSAqIGl0ZW0udmFsdWVzW2ldXG5cbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gbmV3IERvbUVsZW1lbnQoXCJsaVwiKVxuICAgICAgICAgIC5hZGRDbGFzcyhDTEFTU19JTkRJQ0FUT1IpXG4gICAgICAgICAgLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBoZWlnaHQ6ICR7aGVpZ2h0fXB4O2ApXG5cbiAgICAgICAgaWYgKGhlaWdodCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuX2RhdGEuY2F0ZWdvcmllc1tpXS5jb2xvclxuICAgICAgICAgIGlmIChpc0NvbG9yKGNvbG9yKSkge1xuICAgICAgICAgICAgaW5kaWNhdG9yLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTtgKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRpY2F0b3IuYWRkQ2xhc3MoY29sb3IpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGFuaW1hdGlvblN0YWdlcy5sZW5ndGggPD0gaSkge1xuICAgICAgICAgICAgYW5pbWF0aW9uU3RhZ2VzLnB1c2goW10pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYW5pbWF0aW9uU3RhZ2VzW2ldLnB1c2goaW5kaWNhdG9yLmVsZW1lbnQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5kaWNhdG9yLmFkZENsYXNzKENMQVNTX0lORElDQVRPUl9FTVBUWSlcbiAgICAgICAgfVxuXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaW5kaWNhdG9yKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0aXRsZURvbUVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudChcImRpdlwiKVxuICAgICAgICAuYWRkQ2xhc3MoQ0xBU1NfTEFCRUxfWClcbiAgICAgIGNvbnN0IHRpdGxlRWxlbWVudCA9IHRpdGxlRG9tRWxlbWVudC5lbGVtZW50IGFzIEhUTUxFbGVtZW50XG4gICAgICB0aXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gaXRlbS50aXRsZVxuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0aXRsZURvbUVsZW1lbnQpXG5cbiAgICAgIHRoaXMuX2NoYXJ0LmFwcGVuZENoaWxkKGVsZW1lbnQuZWxlbWVudClcbiAgICAgIGxlZnRTaWRlSXRlbXMgLT0gMVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5pbWF0aW9uU3RhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBBTklNQVRJT05fRFVSQVRJT04gKiBpXG4gICAgICB0aGlzLl9hbmltYXRlQmFycyhhbmltYXRpb25TdGFnZXNbaV0gYXMgSFRNTEVsZW1lbnRbXSwgb2Zmc2V0KVxuXG4gICAgICBpZiAodGhpcy5fbGVnZW5kKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGVMZWdlbmQodGhpcy5fbGVnZW5kLmNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50LCBvZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0ZUJhcnMoYmFyczogSFRNTEVsZW1lbnRbXSwgYW5pbWF0aW9uT2Zmc2V0OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGJhciA9IGJhcnNbaV1cbiAgICAgIGNvbnN0IGJhckhlaWdodCA9IGJhci5zdHlsZS5oZWlnaHRcbiAgICAgIGJhci5zdHlsZS5oZWlnaHQgPSBcIjBcIlxuICAgICAgYW5pbWUoe1xuICAgICAgICB0YXJnZXRzOiBiYXJzW2ldLFxuICAgICAgICBoZWlnaHQ6IGJhckhlaWdodCxcbiAgICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFF1aW50XCIsXG4gICAgICAgIGR1cmF0aW9uOiBBTklNQVRJT05fRFVSQVRJT04sXG4gICAgICAgIGRlbGF5OiBhbmltYXRpb25PZmZzZXRcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0ZUxlZ2VuZChsZWdlbmQ6IEhUTUxFbGVtZW50LCBhbmltYXRpb25PZmZzZXQ6IG51bWJlcikge1xuICAgIGxlZ2VuZC5zdHlsZS5vcGFjaXR5ID0gXCIwXCJcbiAgICBhbmltZSh7XG4gICAgICB0YXJnZXRzOiBsZWdlbmQsXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFF1aW50XCIsXG4gICAgICBkdXJhdGlvbjogQU5JTUFUSU9OX0RVUkFUSU9OLFxuICAgICAgZGVsYXk6IGFuaW1hdGlvbk9mZnNldFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgYmFyIGNoYXJ0IHdpdGggdGhlIHNwZWNpZmllZCBkYXRhIGRlZmluaXRpb25zLlxuICAgKiBAcGFyYW0ge0FycmF5fSAtIGJhciBjaGFydCBkYXRhIGRlZmluaXRpb25zLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkYXRhOiBDaGFydERhdGEpIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YSA9IGRhdGFcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXIoKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGV2ZW50IGhhbmRsZXJzIGFuZCBjbGVhcnMgcmVmZXJlbmNlcy5cbiAgICovXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgICh0aGlzIGFzIGFueSkuX2RhdGEgPSB1bmRlZmluZWRcblxuICAgIGlmICh0aGlzLl9sZWdlbmQpIHtcbiAgICAgIHJlbW92ZUFsbENoaWxkcmVuKHRoaXMuX2xlZ2VuZCk7XG4gICAgICAodGhpcyBhcyBhbnkpLl9sZWdlbmQgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIGRlc3Ryb3koKSBpbnN0ZWFkLlxuICAgKiBAdG9kbyByZW1vdmUgaW4gdmVyc2lvbiAyLjAuMFxuICAgKi9cbiAgcHVibGljIGRlc3RvcnkoKSB7XG4gICAgdGhpcy5kZXN0cm95KClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2VhcmNoQW5kSW5pdGlhbGl6ZTxIVE1MRWxlbWVudD4oXCIuYmFyLWNoYXJ0LXZlcnRpY2FsXCIsIChlKSA9PiB7XG4gICAgbmV3IEJhckNoYXJ0VmVydGljYWwoZSlcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFyQ2hhcnRWZXJ0aWNhbFxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
