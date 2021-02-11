import{r as t,h as e}from"./p-95c9f71a.js";const i=class{constructor(e){t(this,e),this.amount=0,this.period="",this.size=2,this.srHint=""}getFormattedAmount(){return String(Math.round(100*this.amount)).replace(/^0$/,"000").replace(/^(.)$/,"0$1").replace(/(..)$/,".$1").replace(/00$|^(?=[.])/,"–")}isInteger(){return this.amount===Math.floor(this.amount)}getClassNames(){return{integer:this.isInteger(),[`text-${this.size>6?"d":"h"}${(this.size>6?9:6)-this.size+1}`]:!0}}render(){return[e("span",{class:this.getClassNames(),"aria-hidden":"true"},this.getFormattedAmount(),e("span",{class:"period"},this.period)),e("span",{class:"sr-only"},this.srHint)]}};i.style='@charset "UTF-8";:host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.text-body-1,.text-standard{line-height:24px;letter-spacing:-0.1px;font-size:18px}.text-body-2,.text-small{line-height:24px;letter-spacing:0;font-size:16px}h1,h2,h3,h4,h5,h6,p{font-family:"TheSans", sans-serif;margin:0;padding:0;text-align:left;word-wrap:break-word}h1,.text-h1,h2,.text-h2{margin-bottom:32px}h3,.text-h3,h4,.text-h4{margin-bottom:24px}h5,.text-h5,h6,.text-h6{margin-bottom:8px}p{line-height:24px;letter-spacing:-0.1px;font-size:18px;font-weight:400;margin-bottom:32px}p:last-child{margin-bottom:0}h1,.text-h1{line-height:48px;letter-spacing:-1.2px;font-size:40px;font-weight:300}h2,.text-h2{line-height:40px;letter-spacing:-1px;font-size:32px;font-weight:300}h3,.text-h3{line-height:32px;letter-spacing:-0.75px;font-size:28px;font-weight:300}h3.text-compact,.text-h3.text-compact{line-height:31px}h4,.text-h4{line-height:32px;letter-spacing:-0.35px;font-size:24px;font-weight:300}h4.text-compact,.text-h4.text-compact{line-height:27px}h5,.text-h5{line-height:24px;letter-spacing:-0.1px;font-size:18px;font-weight:600}h6,.text-h6{line-height:24px;letter-spacing:-0.1px;font-size:16px;font-weight:600}.d1,.text-d1{line-height:48px;letter-spacing:-1.2px;font-size:40px;font-weight:300}@media (min-width: 1024px){.d1,.text-d1{line-height:80px;letter-spacing:-1.75px;font-size:70px}}.d2,.text-d2{line-height:40px;letter-spacing:-1px;font-size:32px;font-weight:300}@media (min-width: 1024px){.d2,.text-d2{line-height:64px;letter-spacing:-1.35px;font-size:54px}}.d3,.text-d3{line-height:32px;letter-spacing:-0.75px;font-size:28px;font-weight:300}@media (min-width: 1024px){.d3,.text-d3{line-height:56px;letter-spacing:-1.2px;font-size:48px}}.text-b1{line-height:24px;letter-spacing:-0.1px;font-size:18px;font-weight:400}.text-b2{line-height:24px;letter-spacing:0;font-size:16px;font-weight:400}.text-sm,.text-smaller{line-height:24px;letter-spacing:0.1px;font-size:14px;font-weight:400}.text-compact{line-height:21px}address{font-style:normal}strong{font-weight:600}em{font-style:italic}.font{font-family:"TheSans", sans-serif}.font--sans{font-family:"TheSans", sans-serif}.font--serif{font-family:"TheSerif", serif}.font--light{font-weight:300}.font--semi-light{font-weight:400}.font--semi-bold{font-weight:600}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.period{font-size:50%;letter-spacing:0}.integer .period{font-size:26%;position:absolute;margin-left:-2em;margin-top:-0.8em}.integer.text-d1 .period,.integer.text-d2 .period,.integer.text-d3 .period{margin-top:0.55em}.text-d1,.text-d2,.text-d3{line-height:1}';export{i as sdx_price}