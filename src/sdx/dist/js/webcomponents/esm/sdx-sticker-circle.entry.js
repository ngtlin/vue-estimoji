import { r as registerInstance, h, H as Host } from './index-28757bf2.js';

const stickerCircleCss = "@charset \"UTF-8\";:host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.white{color:#fff}.navy{color:#015}.blue{color:#086adb}.blue-tint-2,.blue-40{color:#a2cdf4}.blue-tint-3,.blue-20{color:#d1e6f9}.aluminum,.aluminium{color:#dde3e7}.aluminum-tint-2,.aluminum-80,.aluminium-tint-2,.aluminium-80{color:#e4e9ec}.horizon{color:#eef3f6}.horizon-tint-2,.horizon-40{color:#f8fafb}.gray{color:#333}.gray-tint-2,.gray-90{color:#474747}.gray-tint-3,.gray-80{color:#5c5c5c}.gray-tint-4,.gray-mid{color:#666}.gray-tint-5,.gray-60{color:#858585}.gray-tint-6,.gray-40{color:#adadad}.gray-tint-7,.gray-light{color:#bbb}.gray-tint-8,.gray-20{color:#d6d6d6}.sc-blue{color:#1af}.sc-red{color:#d12}.sc-purple{color:#5944c6}.sc-navy{color:#015}.sc-white{color:#fff}.sc-gray{color:#333}.sc-gray-mid{color:#666}.sc-gray-light{color:#bbb}.int-blue{color:#086adb}.int-blue--active{color:#0048CF}.int-gray{color:#cfd5d9}.int-gray--active{color:#b1b9be}.int-green{color:#1B8712}.int-green--active{color:#0D6F2C}.int-red{color:#d12}.int-red--active{color:#be0000}.int-orange{color:#CF4A0C}.int-orange--active{color:#BA3E06}.azure{color:#086adb}.azure--active{color:#0048CF}.orchid{color:#a63297}.orchid--active{color:#7f2879}.orchid-tint-2{color:#ab449f}.orchid-tint-3{color:#b458a8}.orchid-tint-4{color:#bb6ab1}.orchid-tint-5{color:#c47fbb}.orchid-tint-6{color:#cb91c2}.orchid-tint-7{color:#d2a4cc}.orchid-tint-8{color:#dab7d5}.iris{color:#5944c6}.iris--active{color:#42389e}.iris-tint-2{color:#6754c8}.iris-tint-3{color:#7765ce}.iris-tint-4{color:#7177d2}.iris-tint-5{color:#9589d7}.iris-tint-6{color:#a59adb}.iris-tint-7{color:#b4abe0}.iris-tint-8{color:#c3bce2}.pink{color:#e61e64}.pink--active{color:#bf1b5a}.pink-tint-2{color:#e63a70}.pink-tint-3{color:#e74e7f}.pink-tint-4{color:#e8628d}.pink-tint-5{color:#ea779c}.pink-tint-6{color:#eb8baa}.pink-tint-7{color:#eca0b8}.pink-tint-8{color:#edb4c6}.turquoise,.apple,.petrol{color:#0eaba9}.turquoise--active,.apple--active,.petrol--active{color:#0c847e}.turquoise-tint-2{color:#21b1af}.turquoise-tint-3{color:#38b8b6}.turquoise-tint-4{color:#4cc0bd}.turquoise-tint-5{color:#67c7c5}.turquoise-tint-6{color:#7ececd}.turquoise-tint-7{color:#97d5d4}.turquoise-tint-8{color:#a9dbdb}.bg-white{background-color:#fff}.bg-navy{background-color:#015}.bg-blue{background-color:#086adb}.bg-blue-tint-2,.bg-blue-40{background-color:#a2cdf4}.bg-blue-tint-3,.bg-blue-20{background-color:#d1e6f9}.bg-aluminum,.bg-aluminium{background-color:#dde3e7}.bg-aluminum-tint-2,.bg-aluminum-80,.bg-aluminium-tint-2,.bg-aluminium-80{background-color:#e4e9ec}.bg-horizon{background-color:#eef3f6}.bg-horizon-tint-2,.bg-horizon-40{background-color:#f8fafb}.bg-gray{background-color:#333}.bg-gray-tint-2,.bg-gray-90{background-color:#474747}.bg-gray-tint-3,.bg-gray-80{background-color:#5c5c5c}.bg-gray-tint-4,.bg-gray-mid{background-color:#666}.bg-gray-tint-5,.bg-gray-60{background-color:#858585}.bg-gray-tint-6,.bg-gray-40{background-color:#adadad}.bg-gray-tint-7,.bg-gray-light{background-color:#bbb}.bg-gray-tint-8,.bg-gray-20{background-color:#d6d6d6}.bg-sc-blue{background-color:#1af}.bg-sc-red{background-color:#d12}.bg-sc-navy{background-color:#015}.bg-sc-white{background-color:#fff}.bg-int-blue{background-color:#086adb}.bg-int-blue--active{background-color:#0048CF}.bg-int-gray{background-color:#cfd5d9}.bg-int-gray--active{background-color:#b1b9be}.bg-int-green{background-color:#1B8712}.bg-int-green--active{background-color:#0D6F2C}.bg-int-red{background-color:#d12}.bg-int-red--active{background-color:#be0000}.bg-int-orange{background-color:#CF4A0C}.bg-int-orange--active{background-color:#BA3E06}.bg-azure{background-color:#086adb}.bg-azure--active{background-color:#0048CF}.bg-orchid{background-color:#a63297}.bg-orchid--active{background-color:#7f2879}.bg-iris{background-color:#5944c6}.bg-iris--active{background-color:#42389e}.bg-pink{background-color:#e61e64}.bg-pink--active{background-color:#bf1b5a}.bg-turquoise,.bg-apple,.bg-petrol{background-color:#0eaba9}.bg-turquoise--active,.bg-apple--active,.bg-petrol--active{background-color:#0c847e}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.wrapper{position:relative}.wrapper .sticker{position:absolute;overflow:hidden;border:1px solid;border-radius:50%;white-space:nowrap;pointer-events:none}.wrapper .sticker .inner{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);text-align:center;overflow:hidden}.wrapper .slot ::slotted(img){display:block}";

const padding = 16;
const StickerCircle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * The size (diameter) in px.
         */
        this.size = 112;
        /**
         * SDX predefined color class for the text and border.
         */
        this.colorClass = "sc-white";
        /**
         * SDX predefined color class (or transparent) for the sticker background.
         */
        this.bgColorClass = "orchid";
        /**
         * Description text read by the screen reader.
         */
        this.srHint = "";
    }
    /**
     * Listen to window resize events, and resize sticker accordingly
     */
    onWindowResizeThrottled() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
            this.resize();
        }, 10);
    }
    componentDidLoad() {
        this.resize();
    }
    resize() {
        if (this.wrapperEl && this.stickerEl && this.contentWidth) {
            this.stickerEl.style.transform = `scale(${this.wrapperEl.clientWidth / this.contentWidth})`;
        }
    }
    getClassNames() {
        return {
            sticker: true,
            [this.colorClass]: true,
            [`bg-${this.bgColorClass}`]: true
        };
    }
    getStyles() {
        const isScalingEnabled = this.contentWidth !== undefined;
        return {
            sticker: {
                width: `${this.size}px`,
                height: `${this.size}px`,
                top: `${this.top}%`,
                bottom: `${this.bottom}%`,
                left: `${this.left}%`,
                right: `${this.right}%`,
                transformOrigin: `${this.top !== undefined ? "top" : "bottom"} ${this.left !== undefined ? "left" : "right"}`
            },
            inner: {
                maxWidth: `${this.size - 2 * padding}px`,
                maxHeight: `${this.size - 2 * padding}px`
            },
            slot: {
                minWidth: `${isScalingEnabled ? 0 : this.size}px`,
                minHeight: `${isScalingEnabled ? 0 : this.size}px`
            }
        };
    }
    render() {
        return (h(Host, null, h("div", { class: "wrapper", ref: (el) => this.wrapperEl = el }, h("div", { class: this.getClassNames(), style: this.getStyles().sticker, ref: (el) => this.stickerEl = el }, h("div", { class: "inner", style: this.getStyles().inner, "aria-hidden": "true" }, h("slot", { name: "text" }))), h("div", { class: "slot", style: this.getStyles().slot }, h("slot", null))), h("span", { class: "sr-only" }, this.srHint)));
    }
};
StickerCircle.style = stickerCircleCss;

export { StickerCircle as sdx_sticker_circle };
