import{r as o,h as t,g as e}from"./p-95c9f71a.js";import{g as r,m as i}from"./p-486db20f.js";const n=class{constructor(t){o(this,t)}onClick(){var o;null===(o=this.toggle)||void 0===o||o.call(this)}handleKeyDown(o){var t;const e=o.key;"Spacebar"!==e&&" "!==e&&"Enter"!==e||(o.preventDefault(),null===(t=this.toggle)||void 0===t||t.call(this))}componentWillLoad(){var o;this.store=r(this),this.unsubscribe=i(this,this.store,["display","toggle"]),null===(o=this.store)||void 0===o||o.dispatch({type:"SET_TOGGLE_EL",toggleEl:this.el})}componentDidUnload(){var o,t;null===(o=this.store)||void 0===o||o.dispatch({type:"SET_TOGGLE_EL",toggleEl:void 0}),null===(t=this.unsubscribe)||void 0===t||t.call(this)}getAriaExpanded(){return"open"===this.display?"true":"false"}render(){return t("button",{type:"button",class:"toggle","aria-expanded":this.getAriaExpanded()},t("slot",null))}get el(){return e(this)}};n.style=":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.toggle{padding:0;background-color:transparent;color:#086adb;border:none;font:inherit;outline:none;cursor:pointer}.toggle:hover,.toggle:focus{color:#0048CF}";export{n as sdx_menu_flyout_toggle}