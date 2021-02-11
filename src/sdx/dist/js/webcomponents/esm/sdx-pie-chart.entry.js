import { r as registerInstance, h } from './index-28757bf2.js';
import { p as parseJson } from './webcomponent-helpers-5a1adad8.js';
import { a as anime } from './anime.es-7aa2f713.js';

const colors = {
    aluminium: "#dde3e7",
    "aluminium-tint-2": "#e4e9ec",
    horizon: "#eef3f6",
    turquoise: "#0eaba9",
    azure: "#1781e3",
    iris: "#5944c6",
    orchid: "#a63297",
    pink: "#e61e64",
    light: "rgba(0, 0, 0, .1)",
    dark: "rgba(255, 255, 255, .4)"
};

const pieChartCss = "@charset \"UTF-8\";:host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.component{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.component.small .wrapper .chart-container .chart{height:64px;width:64px}.component.small .wrapper .chart-container .chart svg{height:64px;width:64px;stroke-linecap:butt}.component.small .wrapper .chart-container .metadata{font-size:16px;top:8px;right:8px;bottom:8px;left:8px}.component.bottom .wrapper{-ms-flex-direction:column;flex-direction:column;-ms-flex-preferred-size:100%;flex-basis:100%}.component.bottom .wrapper .legend{margin-top:24px;-ms-flex-wrap:wrap;flex-wrap:wrap;width:100%}.component.bottom .wrapper .legend li:not(:last-of-type){margin-right:24px}.component.right .wrapper .legend{margin-left:32px;-ms-flex-direction:column;flex-direction:column}.component.right .wrapper .legend li:not(:last-of-type){margin-bottom:8px}.component.dark .wrapper .chart-container .metadata,.component.dark .wrapper .chart-container .metadata .description{color:white}.component .wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.component .wrapper .chart-container{position:relative}.component .wrapper .chart-container .chart{-webkit-transform:rotate(-90deg);transform:rotate(-90deg);height:182px;width:182px}.component .wrapper .chart-container .chart svg{position:absolute;top:0;left:0;fill:transparent;stroke-width:2;stroke-linecap:round;height:182px;width:182px}.component .wrapper .chart-container .metadata{font-weight:400;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:28px;letter-spacing:-0.89px;font-size:32px;position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;top:32px;right:24px;bottom:24px;left:24px}.component .wrapper .chart-container .metadata .description{font-size:16px;color:#666;white-space:nowrap;width:100%;overflow:hidden;text-overflow:ellipsis;text-align:center}.component .wrapper .legend{display:-ms-flexbox;display:flex;list-style:none;padding:0;font-weight:300;-ms-flex-pack:center;justify-content:center;margin:0}.component .wrapper .legend li{white-space:nowrap}";

const PieChart = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.viewBox = 34;
        this.radius = 16;
        this.segmentPaddingForSizeSmall = 0;
        this.segmentPaddingForSizeMedium = 3;
        this.hundredPercent = this.radius * 2 * Math.PI;
        this.animationDuration = 300;
        /**
         * The values to display.
         */
        this.data = [];
        /**
         * Text that contains the relevant information (e.g. "100 %").
         * It will be displayed in the center of the chart.
         */
        this.value = "";
        /**
         * Where to render the labels.
         */
        this.legendPosition = "bottom";
        /**
         * Dimension of the chart.
         */
        this.size = "medium";
        /**
         * Background color scheme.
         */
        this.backgroundTheme = "light";
        this.dataState = [];
    }
    dataChanged() {
        this.dataState = parseJson(this.data) || [];
    }
    componentWillLoad() {
        this.dataState = parseJson(this.data) || [];
    }
    animateSegment(segment, timeline) {
        if (!segment.circle) {
            return;
        }
        // Initial stroke-dasharray
        segment.circle.style.strokeDasharray = `0 ${this.hundredPercent}`;
        timeline.add({
            targets: segment.circle,
            begin: () => segment.circle.style.display = "",
            strokeDasharray: `${segment.width} ${this.hundredPercent}`,
            duration: this.animationDuration,
            easing: "easeInQuint"
        });
    }
    animateLegendItem(legendItem, timeline) {
        if (!legendItem) {
            return;
        }
        timeline.add({
            targets: legendItem,
            opacity: 1,
            duration: this.animationDuration,
            easing: "easeInQuint"
        });
    }
    /**
     * Read the data and create a pie part (segment) for every data point.
     * The SDX pie chart is special in two ways:
     * 1. it has a spacing between the segments (called segmentPadding)
     * 2. small values (values smaller than the segmentPadding) are represented by only a dot.
     *    This makes the math behind *special*, for example:
     *    If a chart has the values [1, 1, 1, 1000], the three "1" use up much more space than
     *    they would in an ordinary pie chart (where they would be hardly recognizable).
     *    This limits the amount of data segments (e.g. [1 * 50, 1000] ends up glitchy).
     */
    dataToSegments() {
        const segmentPadding = this.size === "medium"
            ? this.segmentPaddingForSizeMedium
            : this.segmentPaddingForSizeSmall;
        // Calculate the "max"
        const totalValue = this.dataState.reduce((total, d) => total + d.value, 0);
        const segmentsSmallerThanPadding = this.dataState.filter((d) => {
            let width = d.value / totalValue * this.hundredPercent;
            return width < segmentPadding;
        });
        const totalValueOfSegmentsSmallerThanPadding = segmentsSmallerThanPadding.reduce((total, d) => {
            return total + d.value;
        }, 0);
        const segmentPaddingRotationDeg = (360 / this.hundredPercent * segmentPadding);
        let rotation = segmentPaddingRotationDeg; // initial
        return this.dataState
            .filter(({}, i) => this.size === "small" ? i === 0 : true) // "small" only has one segment
            .map((d) => {
            // Calculate how much space is left without all the small segments
            // (a.k.a. calculate the "real" 100%)
            const availableWidth = this.hundredPercent - (segmentPadding * segmentsSmallerThanPadding.length);
            let width = d.value / (totalValue - totalValueOfSegmentsSmallerThanPadding) * availableWidth;
            if (width < segmentPadding) {
                // Small values are represented by only a dot (using CSS "stroke-linecap: round;")
                width = 0;
            }
            else {
                // Create padding
                width = width - segmentPadding;
            }
            const segment = { d, width, rotation };
            rotation += this.widthToDeg(segment.width) + segmentPaddingRotationDeg;
            return segment;
        });
    }
    widthToDeg(width) {
        return 360 / this.hundredPercent * width;
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.legendPosition]: true,
            [this.size]: true,
            [this.backgroundTheme]: true
        };
    }
    hasLabelsOrSrHints() {
        return this.dataState.some(this.hasLabelOrSrHint);
    }
    hasLabelOrSrHint(d) {
        return !!d.label || !!d.srHint;
    }
    getSegmentColor(d) {
        if (d && d.color) {
            return colors[d.color];
        }
        // Fall back to default color (which depends on the background)
        return colors[this.backgroundTheme];
    }
    render() {
        const center = this.viewBox / 2;
        const segmentsTimeline = anime.timeline();
        const legendItemsTimeline = anime.timeline();
        return (h("div", { class: this.getComponentClassNames() }, h("div", { class: "wrapper" }, h("div", { class: "chart-container" }, h("div", { class: "chart" }, this.size === "small" &&
            h("svg", { viewBox: `0 0 ${this.viewBox} ${this.viewBox}`, style: { transform: `rotate(${this.widthToDeg(this.hundredPercent)}deg)` } }, h("circle", { stroke: this.getSegmentColor(), cx: center, cy: center, r: this.radius })), this.dataToSegments().map((segment) => {
            return (h("svg", {
                // @ts-ignore, TODO: Remove this line as soon as this Stencil bug has been solved: https://github.com/ionic-team/stencil/pull/2113
                key: Math.random() /* make sure elements are not reused (causing glitchy animations) */, viewBox: `0 0 ${this.viewBox} ${this.viewBox}`, style: { transform: `rotate(${segment.rotation}deg)` }
            }, h("circle", { ref: (el) => this.animateSegment(Object.assign(Object.assign({}, segment), { circle: el }), segmentsTimeline), style: { display: "none" /* will be displayed during animation */ }, stroke: this.getSegmentColor(segment.d), cx: center, cy: center, r: this.radius })));
        })), h("div", { class: "metadata", "aria-hidden": "true" }, h("div", { class: "value" }, this.value), this.size !== "small" &&
            h("div", { class: "description" }, this.description))), this.hasLabelsOrSrHints() &&
            h("ul", { class: { legend: true, "sr-only": this.size === "small" } }, this.dataState.filter(this.hasLabelOrSrHint).map((d) => {
                return (h("li", { key: Math.random() /* make sure elements are not reused (causing glitchy animations) */, ref: (el) => this.animateLegendItem(el, legendItemsTimeline), style: { opacity: "0" } }, h("span", { "aria-hidden": "true" }, h("sdx-icon", { "icon-name": "icon-record-filled", style: { color: this.getSegmentColor(d) } }), " ", d.label), d.srHint && h("span", { class: "sr-only" }, d.srHint)));
            })))));
    }
    static get watchers() { return {
        "data": ["dataChanged"]
    }; }
};
PieChart.style = pieChartCss;

export { PieChart as sdx_pie_chart };
