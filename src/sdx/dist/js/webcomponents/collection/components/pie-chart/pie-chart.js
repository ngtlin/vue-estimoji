import { Component, h, Prop, State, Watch } from "@stencil/core";
import anime from "animejs";
import { colors } from "../../core/variables/colors";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class PieChart {
    constructor() {
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
        this.dataState = wcHelpers.parseJson(this.data) || [];
    }
    componentWillLoad() {
        this.dataState = wcHelpers.parseJson(this.data) || [];
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
        return (h("div", { class: this.getComponentClassNames() },
            h("div", { class: "wrapper" },
                h("div", { class: "chart-container" },
                    h("div", { class: "chart" },
                        this.size === "small" &&
                            h("svg", { viewBox: `0 0 ${this.viewBox} ${this.viewBox}`, style: { transform: `rotate(${this.widthToDeg(this.hundredPercent)}deg)` } },
                                h("circle", { stroke: this.getSegmentColor(), cx: center, cy: center, r: this.radius })),
                        this.dataToSegments().map((segment) => {
                            return (h("svg", { 
                                // @ts-ignore, TODO: Remove this line as soon as this Stencil bug has been solved: https://github.com/ionic-team/stencil/pull/2113
                                key: Math.random() /* make sure elements are not reused (causing glitchy animations) */, viewBox: `0 0 ${this.viewBox} ${this.viewBox}`, style: { transform: `rotate(${segment.rotation}deg)` } },
                                h("circle", { ref: (el) => this.animateSegment(Object.assign(Object.assign({}, segment), { circle: el }), segmentsTimeline), style: { display: "none" /* will be displayed during animation */ }, stroke: this.getSegmentColor(segment.d), cx: center, cy: center, r: this.radius })));
                        })),
                    h("div", { class: "metadata", "aria-hidden": "true" },
                        h("div", { class: "value" }, this.value),
                        this.size !== "small" &&
                            h("div", { class: "description" }, this.description))),
                this.hasLabelsOrSrHints() &&
                    h("ul", { class: { legend: true, "sr-only": this.size === "small" } }, this.dataState.filter(this.hasLabelOrSrHint).map((d) => {
                        return (h("li", { key: Math.random() /* make sure elements are not reused (causing glitchy animations) */, ref: (el) => this.animateLegendItem(el, legendItemsTimeline), style: { opacity: "0" } },
                            h("span", { "aria-hidden": "true" },
                                h("sdx-icon", { "icon-name": "icon-record-filled", style: { color: this.getSegmentColor(d) } }),
                                " ",
                                d.label),
                            d.srHint && h("span", { class: "sr-only" }, d.srHint)));
                    })))));
    }
    static get is() { return "sdx-pie-chart"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["pie-chart.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["pie-chart.css"]
    }; }
    static get properties() { return {
        "data": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "PieChartDataPoint[] | string",
                "resolved": "PieChartDataPoint[] | string",
                "references": {
                    "PieChartDataPoint": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The values to display."
            },
            "attribute": "data",
            "reflect": false,
            "defaultValue": "[]"
        },
        "value": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Text that contains the relevant information (e.g. \"100 %\").\nIt will be displayed in the center of the chart."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "description": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Description text of what is displayed (e.g. \"Storage\" or \"Available\").\nThis does not appear in the \"small\" version."
            },
            "attribute": "description",
            "reflect": false
        },
        "legendPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"bottom\" | \"right\"",
                "resolved": "\"bottom\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Where to render the labels."
            },
            "attribute": "legend-position",
            "reflect": false,
            "defaultValue": "\"bottom\""
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"small\" | \"medium\"",
                "resolved": "\"medium\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Dimension of the chart."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "\"medium\""
        },
        "backgroundTheme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "BackgroundTheme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "BackgroundTheme": {
                        "location": "import",
                        "path": "../../core/types/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Background color scheme."
            },
            "attribute": "background-theme",
            "reflect": false,
            "defaultValue": "\"light\""
        }
    }; }
    static get states() { return {
        "dataState": {}
    }; }
    static get watchers() { return [{
            "propName": "data",
            "methodName": "dataChanged"
        }]; }
}
