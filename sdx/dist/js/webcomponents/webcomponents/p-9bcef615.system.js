System.register([],(function(r){"use strict";return{execute:function(){var e={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:true,timelineOffset:0};var n={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0};var t=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective"];var a={CSS:{},springs:{}};function i(r,e,n){return Math.min(Math.max(r,e),n)}function u(r,e){return r.indexOf(e)>-1}function o(r,e){return r.apply(null,e)}var f={arr:function(r){return Array.isArray(r)},obj:function(r){return u(Object.prototype.toString.call(r),"Object")},pth:function(r){return f.obj(r)&&r.hasOwnProperty("totalLength")},svg:function(r){return r instanceof SVGElement},inp:function(r){return r instanceof HTMLInputElement},dom:function(r){return r.nodeType||f.svg(r)},str:function(r){return typeof r==="string"},fnc:function(r){return typeof r==="function"},und:function(r){return typeof r==="undefined"},hex:function(r){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(r)},rgb:function(r){return/^rgb/.test(r)},hsl:function(r){return/^hsl/.test(r)},col:function(r){return f.hex(r)||f.rgb(r)||f.hsl(r)},key:function(r){return!e.hasOwnProperty(r)&&!n.hasOwnProperty(r)&&r!=="targets"&&r!=="keyframes"}};function s(r){var e=/\(([^)]+)\)/.exec(r);return e?e[1].split(",").map((function(r){return parseFloat(r)})):[]}function c(r,e){var n=s(r);var t=i(f.und(n[0])?1:n[0],.1,100);var u=i(f.und(n[1])?100:n[1],.1,100);var o=i(f.und(n[2])?10:n[2],.1,100);var c=i(f.und(n[3])?0:n[3],.1,100);var v=Math.sqrt(u/t);var l=o/(2*Math.sqrt(u*t));var d=l<1?v*Math.sqrt(1-l*l):0;var p=1;var h=l<1?(l*v+-c)/d:-c+v;function g(r){var n=e?e*r/1e3:r;if(l<1){n=Math.exp(-n*l*v)*(p*Math.cos(d*n)+h*Math.sin(d*n))}else{n=(p+h*n)*Math.exp(-n*v)}if(r===0||r===1){return r}return 1-n}function m(){var e=a.springs[r];if(e){return e}var n=1/6;var t=0;var i=0;while(true){t+=n;if(g(t)===1){i++;if(i>=16){break}}else{i=0}}var u=t*n*1e3;a.springs[r]=u;return u}return e?g:m}function v(r){if(r===void 0)r=10;return function(e){return Math.round(e*r)*(1/r)}}var l=function(){var r=11;var e=1/(r-1);function n(r,e){return 1-3*e+3*r}function t(r,e){return 3*e-6*r}function a(r){return 3*r}function i(r,e,i){return((n(e,i)*r+t(e,i))*r+a(e))*r}function u(r,e,i){return 3*n(e,i)*r*r+2*t(e,i)*r+a(e)}function o(r,e,n,t,a){var u,o,f=0;do{o=e+(n-e)/2;u=i(o,t,a)-r;if(u>0){n=o}else{e=o}}while(Math.abs(u)>1e-7&&++f<10);return o}function f(r,e,n,t){for(var a=0;a<4;++a){var o=u(e,n,t);if(o===0){return e}var f=i(e,n,t)-r;e-=f/o}return e}function s(n,t,a,s){if(!(0<=n&&n<=1&&0<=a&&a<=1)){return}var c=new Float32Array(r);if(n!==t||a!==s){for(var v=0;v<r;++v){c[v]=i(v*e,n,a)}}function l(t){var i=0;var s=1;var v=r-1;for(;s!==v&&c[s]<=t;++s){i+=e}--s;var l=(t-c[s])/(c[s+1]-c[s]);var d=i+l*e;var p=u(d,n,a);if(p>=.001){return f(t,d,n,a)}else if(p===0){return d}else{return o(t,i,i+e,n,a)}}return function(r){if(n===t&&a===s){return r}if(r===0||r===1){return r}return i(l(r),t,s)}}return s}();var d=function(){var r={linear:function(){return function(r){return r}}};var e={Sine:function(){return function(r){return 1-Math.cos(r*Math.PI/2)}},Circ:function(){return function(r){return 1-Math.sqrt(1-r*r)}},Back:function(){return function(r){return r*r*(3*r-2)}},Bounce:function(){return function(r){var e,n=4;while(r<((e=Math.pow(2,--n))-1)/11){}return 1/Math.pow(4,3-n)-7.5625*Math.pow((e*3-2)/22-r,2)}},Elastic:function(r,e){if(r===void 0)r=1;if(e===void 0)e=.5;var n=i(r,1,10);var t=i(e,.1,2);return function(r){return r===0||r===1?r:-n*Math.pow(2,10*(r-1))*Math.sin((r-1-t/(Math.PI*2)*Math.asin(1/n))*(Math.PI*2)/t)}}};var n=["Quad","Cubic","Quart","Quint","Expo"];n.forEach((function(r,n){e[r]=function(){return function(r){return Math.pow(r,n+2)}}}));Object.keys(e).forEach((function(n){var t=e[n];r["easeIn"+n]=t;r["easeOut"+n]=function(r,e){return function(n){return 1-t(r,e)(1-n)}};r["easeInOut"+n]=function(r,e){return function(n){return n<.5?t(r,e)(n*2)/2:1-t(r,e)(n*-2+2)/2}}}));return r}();function p(r,e){if(f.fnc(r)){return r}var n=r.split("(")[0];var t=d[n];var a=s(r);switch(n){case"spring":return c(r,e);case"cubicBezier":return o(l,a);case"steps":return o(v,a);default:return o(t,a)}}function h(r){try{var e=document.querySelectorAll(r);return e}catch(n){return}}function g(r,e){var n=r.length;var t=arguments.length>=2?arguments[1]:void 0;var a=[];for(var i=0;i<n;i++){if(i in r){var u=r[i];if(e.call(t,u,i,r)){a.push(u)}}}return a}function m(r){return r.reduce((function(r,e){return r.concat(f.arr(e)?m(e):e)}),[])}function y(r){if(f.arr(r)){return r}if(f.str(r)){r=h(r)||r}if(r instanceof NodeList||r instanceof HTMLCollection){return[].slice.call(r)}return[r]}function b(r,e){return r.some((function(r){return r===e}))}function w(r){var e={};for(var n in r){e[n]=r[n]}return e}function M(r,e){var n=w(r);for(var t in r){n[t]=e.hasOwnProperty(t)?e[t]:r[t]}return n}function x(r,e){var n=w(r);for(var t in e){n[t]=f.und(r[t])?e[t]:r[t]}return n}function k(r){var e=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(r);return e?"rgba("+e[1]+",1)":r}function O(r){var e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;var n=r.replace(e,(function(r,e,n,t){return e+e+n+n+t+t}));var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);var a=parseInt(t[1],16);var i=parseInt(t[2],16);var u=parseInt(t[3],16);return"rgba("+a+","+i+","+u+",1)"}function C(r){var e=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(r)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(r);var n=parseInt(e[1],10)/360;var t=parseInt(e[2],10)/100;var a=parseInt(e[3],10)/100;var i=e[4]||1;function u(r,e,n){if(n<0){n+=1}if(n>1){n-=1}if(n<1/6){return r+(e-r)*6*n}if(n<1/2){return e}if(n<2/3){return r+(e-r)*(2/3-n)*6}return r}var o,f,s;if(t==0){o=f=s=a}else{var c=a<.5?a*(1+t):a+t-a*t;var v=2*a-c;o=u(v,c,n+1/3);f=u(v,c,n);s=u(v,c,n-1/3)}return"rgba("+o*255+","+f*255+","+s*255+","+i+")"}function B(r){if(f.rgb(r)){return k(r)}if(f.hex(r)){return O(r)}if(f.hsl(r)){return C(r)}}function P(r){var e=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(r);if(e){return e[1]}}function I(r){if(u(r,"translate")||r==="perspective"){return"px"}if(u(r,"rotate")||u(r,"skew")){return"deg"}}function T(r,e){if(!f.fnc(r)){return r}return r(e.target,e.id,e.total)}function D(r,e){return r.getAttribute(e)}function E(r,e,n){var t=P(e);if(b([n,"deg","rad","turn"],t)){return e}var i=a.CSS[e+n];if(!f.und(i)){return i}var u=100;var o=document.createElement(r.tagName);var s=r.parentNode&&r.parentNode!==document?r.parentNode:document.body;s.appendChild(o);o.style.position="absolute";o.style.width=u+n;var c=u/o.offsetWidth;s.removeChild(o);var v=c*parseFloat(e);a.CSS[e+n]=v;return v}function F(r,e,n){if(e in r.style){var t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();var a=r.style[e]||getComputedStyle(r).getPropertyValue(t)||"0";return n?E(r,a,n):a}}function N(r,e){if(f.dom(r)&&!f.inp(r)&&(D(r,e)||f.svg(r)&&r[e])){return"attribute"}if(f.dom(r)&&b(t,e)){return"transform"}if(f.dom(r)&&(e!=="transform"&&F(r,e))){return"css"}if(r[e]!=null){return"object"}}function A(r){if(!f.dom(r)){return}var e=r.style.transform||"";var n=/(\w+)\(([^)]*)\)/g;var t=new Map;var a;while(a=n.exec(e)){t.set(a[1],a[2])}return t}function L(r,e,n,t){var a=u(e,"scale")?1:0+I(e);var i=A(r).get(e)||a;if(n){n.transforms.list.set(e,i);n.transforms["last"]=e}return t?E(r,i,t):i}function S(r,e,n,t){switch(N(r,e)){case"transform":return L(r,e,t,n);case"css":return F(r,e,n);case"attribute":return D(r,e);default:return r[e]||0}}function j(r,e){var n=/^(\*=|\+=|-=)/.exec(r);if(!n){return r}var t=P(r)||0;var a=parseFloat(e);var i=parseFloat(r.replace(n[0],""));switch(n[0][0]){case"+":return a+i+t;case"-":return a-i+t;case"*":return a*i+t}}function q(r,e){if(f.col(r)){return B(r)}if(/\s/g.test(r)){return r}var n=P(r);var t=n?r.substr(0,r.length-n.length):r;if(e){return t+e}return t}function $(r,e){return Math.sqrt(Math.pow(e.x-r.x,2)+Math.pow(e.y-r.y,2))}function X(r){return Math.PI*2*D(r,"r")}function Y(r){return D(r,"width")*2+D(r,"height")*2}function Z(r){return $({x:D(r,"x1"),y:D(r,"y1")},{x:D(r,"x2"),y:D(r,"y2")})}function Q(r){var e=r.points;var n=0;var t;for(var a=0;a<e.numberOfItems;a++){var i=e.getItem(a);if(a>0){n+=$(t,i)}t=i}return n}function V(r){var e=r.points;return Q(r)+$(e.getItem(e.numberOfItems-1),e.getItem(0))}function z(r){if(r.getTotalLength){return r.getTotalLength()}switch(r.tagName.toLowerCase()){case"circle":return X(r);case"rect":return Y(r);case"line":return Z(r);case"polyline":return Q(r);case"polygon":return V(r)}}function H(r){var e=z(r);r.setAttribute("stroke-dasharray",e);return e}function G(r){var e=r.parentNode;while(f.svg(e)){if(!f.svg(e.parentNode)){break}e=e.parentNode}return e}function R(r,e){var n=e||{};var t=n.el||G(r);var a=t.getBoundingClientRect();var i=D(t,"viewBox");var u=a.width;var o=a.height;var f=n.viewBox||(i?i.split(" "):[0,0,u,o]);return{el:t,viewBox:f,x:f[0]/1,y:f[1]/1,w:u/f[2],h:o/f[3]}}function W(r,e){var n=f.str(r)?h(r)[0]:r;var t=e||100;return function(r){return{property:r,el:n,svg:R(n),totalLength:z(n)*(t/100)}}}function J(r,e){function n(n){if(n===void 0)n=0;var t=e+n>=1?e+n:0;return r.el.getPointAtLength(t)}var t=R(r.el,r.svg);var a=n();var i=n(-1);var u=n(+1);switch(r.property){case"x":return(a.x-t.x)*t.w;case"y":return(a.y-t.y)*t.h;case"angle":return Math.atan2(u.y-i.y,u.x-i.x)*180/Math.PI}}function K(r,e){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;var t=q(f.pth(r)?r.totalLength:r,e)+"";return{original:t,numbers:t.match(n)?t.match(n).map(Number):[0],strings:f.str(r)||e?t.split(n):[]}}function U(r){var e=r?m(f.arr(r)?r.map(y):y(r)):[];return g(e,(function(r,e,n){return n.indexOf(r)===e}))}function _(r){var e=U(r);return e.map((function(r,n){return{target:r,id:n,total:e.length,transforms:{list:A(r)}}}))}function rr(r,e){var n=w(e);if(/^spring/.test(n.easing)){n.duration=c(n.easing)}if(f.arr(r)){var t=r.length;var a=t===2&&!f.obj(r[0]);if(!a){if(!f.fnc(e.duration)){n.duration=e.duration/t}}else{r={value:r}}}var i=f.arr(r)?r:[r];return i.map((function(r,n){var t=f.obj(r)&&!f.pth(r)?r:{value:r};if(f.und(t.delay)){t.delay=!n?e.delay:0}if(f.und(t.endDelay)){t.endDelay=n===i.length-1?e.endDelay:0}return t})).map((function(r){return x(r,n)}))}function er(r){var e=g(m(r.map((function(r){return Object.keys(r)}))),(function(r){return f.key(r)})).reduce((function(r,e){if(r.indexOf(e)<0){r.push(e)}return r}),[]);var n={};var t=function(t){var a=e[t];n[a]=r.map((function(r){var e={};for(var n in r){if(f.key(n)){if(n==a){e.value=r[n]}}else{e[n]=r[n]}}return e}))};for(var a=0;a<e.length;a++)t(a);return n}function nr(r,e){var n=[];var t=e.keyframes;if(t){e=x(er(t),e)}for(var a in e){if(f.key(a)){n.push({name:a,tweens:rr(e[a],r)})}}return n}function tr(r,e){var n={};for(var t in r){var a=T(r[t],e);if(f.arr(a)){a=a.map((function(r){return T(r,e)}));if(a.length===1){a=a[0]}}n[t]=a}n.duration=parseFloat(n.duration);n.delay=parseFloat(n.delay);return n}function ar(r,e){var n;return r.tweens.map((function(t){var a=tr(t,e);var i=a.value;var u=f.arr(i)?i[1]:i;var o=P(u);var s=S(e.target,r.name,o,e);var c=n?n.to.original:s;var v=f.arr(i)?i[0]:c;var l=P(v)||P(s);var d=o||l;if(f.und(u)){u=c}a.from=K(v,d);a.to=K(j(u,v),d);a.start=n?n.end:0;a.end=a.start+a.delay+a.duration+a.endDelay;a.easing=p(a.easing,a.duration);a.isPath=f.pth(i);a.isColor=f.col(a.from.original);if(a.isColor){a.round=1}n=a;return a}))}var ir={css:function(r,e,n){return r.style[e]=n},attribute:function(r,e,n){return r.setAttribute(e,n)},object:function(r,e,n){return r[e]=n},transform:function(r,e,n,t,a){t.list.set(e,n);if(e===t.last||a){var i="";t.list.forEach((function(r,e){i+=e+"("+r+") "}));r.style.transform=i}}};function ur(r,e){var n=_(r);n.forEach((function(r){for(var n in e){var t=T(e[n],r);var a=r.target;var i=P(t);var u=S(a,n,i,r);var o=i||P(u);var f=j(q(t,o),u);var s=N(a,n);ir[s](a,n,f,r.transforms,true)}}))}function or(r,e){var n=N(r.target,e.name);if(n){var t=ar(e,r);var a=t[t.length-1];return{type:n,property:e.name,animatable:r,tweens:t,duration:a.end,delay:t[0].delay,endDelay:a.endDelay}}}function fr(r,e){return g(m(r.map((function(r){return e.map((function(e){return or(r,e)}))}))),(function(r){return!f.und(r)}))}function sr(r,e){var n=r.length;var t=function(r){return r.timelineOffset?r.timelineOffset:0};var a={};a.duration=n?Math.max.apply(Math,r.map((function(r){return t(r)+r.duration}))):e.duration;a.delay=n?Math.min.apply(Math,r.map((function(r){return t(r)+r.delay}))):e.delay;a.endDelay=n?a.duration-Math.max.apply(Math,r.map((function(r){return t(r)+r.duration-r.endDelay}))):e.endDelay;return a}var cr=0;function vr(r){var t=M(e,r);var a=M(n,r);var i=nr(a,r);var u=_(r.targets);var o=fr(u,i);var f=sr(o,a);var s=cr;cr++;return x(t,{id:s,children:[],animatables:u,animations:o,duration:f.duration,delay:f.delay,endDelay:f.endDelay})}var lr=[];var dr=[];var pr;var hr=function(){function r(){pr=requestAnimationFrame(e)}function e(e){var n=lr.length;if(n){var t=0;while(t<n){var a=lr[t];if(!a.paused){a.tick(e)}else{var i=lr.indexOf(a);if(i>-1){lr.splice(i,1);n=lr.length}}t++}r()}else{pr=cancelAnimationFrame(pr)}}return r}();function gr(){if(document.hidden){lr.forEach((function(r){return r.pause()}));dr=lr.slice(0);mr.running=lr=[]}else{dr.forEach((function(r){return r.play()}))}}if(typeof document!=="undefined"){document.addEventListener("visibilitychange",gr)}function mr(r){if(r===void 0)r={};var e=0,n=0,t=0;var a,u=0;var o=null;function f(r){var e=window.Promise&&new Promise((function(r){return o=r}));r.finished=e;return e}var s=vr(r);var c=f(s);function v(){var r=s.direction;if(r!=="alternate"){s.direction=r!=="normal"?"normal":"reverse"}s.reversed=!s.reversed;a.forEach((function(r){return r.reversed=s.reversed}))}function l(r){return s.reversed?s.duration-r:r}function d(){e=0;n=l(s.currentTime)*(1/mr.speed)}function p(r,e){if(e){e.seek(r-e.timelineOffset)}}function h(r){if(!s.reversePlayback){for(var e=0;e<u;e++){p(r,a[e])}}else{for(var n=u;n--;){p(r,a[n])}}}function m(r){var e=0;var n=s.animations;var t=n.length;while(e<t){var a=n[e];var u=a.animatable;var o=a.tweens;var f=o.length-1;var c=o[f];if(f){c=g(o,(function(e){return r<e.end}))[0]||c}var v=i(r-c.start-c.delay,0,c.duration)/c.duration;var l=isNaN(v)?1:c.easing(v);var d=c.to.strings;var p=c.round;var h=[];var m=c.to.numbers.length;var y=void 0;for(var b=0;b<m;b++){var w=void 0;var M=c.to.numbers[b];var x=c.from.numbers[b]||0;if(!c.isPath){w=x+l*(M-x)}else{w=J(c.value,l*M)}if(p){if(!(c.isColor&&b>2)){w=Math.round(w*p)/p}}h.push(w)}var k=d.length;if(!k){y=h[0]}else{y=d[0];for(var O=0;O<k;O++){var C=d[O+1];var B=h[O];if(!isNaN(B)){if(!C){y+=B+" "}else{y+=B+C}}}}ir[a.type](u.target,a.property,y,u.transforms);a.currentValue=y;e++}}function y(r){if(s[r]&&!s.passThrough){s[r](s)}}function b(){if(s.remaining&&s.remaining!==true){s.remaining--}}function w(r){var u=s.duration;var d=s.delay;var p=u-s.endDelay;var g=l(r);s.progress=i(g/u*100,0,100);s.reversePlayback=g<s.currentTime;if(a){h(g)}if(!s.began&&s.currentTime>0){s.began=true;y("begin")}if(!s.loopBegan&&s.currentTime>0){s.loopBegan=true;y("loopBegin")}if(g<=d&&s.currentTime!==0){m(0)}if(g>=p&&s.currentTime!==u||!u){m(u)}if(g>d&&g<p){if(!s.changeBegan){s.changeBegan=true;s.changeCompleted=false;y("changeBegin")}y("change");m(g)}else{if(s.changeBegan){s.changeCompleted=true;s.changeBegan=false;y("changeComplete")}}s.currentTime=i(g,0,u);if(s.began){y("update")}if(r>=u){n=0;b();if(!s.remaining){s.paused=true;if(!s.completed){s.completed=true;y("loopComplete");y("complete");if(!s.passThrough&&"Promise"in window){o();c=f(s)}}}else{e=t;y("loopComplete");s.loopBegan=false;if(s.direction==="alternate"){v()}}}}s.reset=function(){var r=s.direction;s.passThrough=false;s.currentTime=0;s.progress=0;s.paused=true;s.began=false;s.loopBegan=false;s.changeBegan=false;s.completed=false;s.changeCompleted=false;s.reversePlayback=false;s.reversed=r==="reverse";s.remaining=s.loop;a=s.children;u=a.length;for(var e=u;e--;){s.children[e].reset()}if(s.reversed&&s.loop!==true||r==="alternate"&&s.loop===1){s.remaining++}m(s.reversed?s.duration:0)};s.set=function(r,e){ur(r,e);return s};s.tick=function(r){t=r;if(!e){e=t}w((t+(n-e))*mr.speed)};s.seek=function(r){w(l(r))};s.pause=function(){s.paused=true;d()};s.play=function(){if(!s.paused){return}if(s.completed){s.reset()}s.paused=false;lr.push(s);d();if(!pr){hr()}};s.reverse=function(){v();d()};s.restart=function(){s.reset();s.play()};s.reset();if(s.autoplay){s.play()}return s}function yr(r,e){for(var n=e.length;n--;){if(b(r,e[n].animatable.target)){e.splice(n,1)}}}function br(r){var e=U(r);for(var n=lr.length;n--;){var t=lr[n];var a=t.animations;var i=t.children;yr(e,a);for(var u=i.length;u--;){var o=i[u];var f=o.animations;yr(e,f);if(!f.length&&!o.children.length){i.splice(u,1)}}if(!a.length&&!i.length){t.pause()}}}function wr(r,e){if(e===void 0)e={};var n=e.direction||"normal";var t=e.easing?p(e.easing):null;var a=e.grid;var i=e.axis;var u=e.from||0;var o=u==="first";var s=u==="center";var c=u==="last";var v=f.arr(r);var l=v?parseFloat(r[0]):parseFloat(r);var d=v?parseFloat(r[1]):0;var h=P(v?r[1]:r)||0;var g=e.start||0+(v?l:0);var m=[];var y=0;return function(r,e,f){if(o){u=0}if(s){u=(f-1)/2}if(c){u=f-1}if(!m.length){for(var p=0;p<f;p++){if(!a){m.push(Math.abs(u-p))}else{var b=!s?u%a[0]:(a[0]-1)/2;var w=!s?Math.floor(u/a[0]):(a[1]-1)/2;var M=p%a[0];var x=Math.floor(p/a[0]);var k=b-M;var O=w-x;var C=Math.sqrt(k*k+O*O);if(i==="x"){C=-k}if(i==="y"){C=-O}m.push(C)}y=Math.max.apply(Math,m)}if(t){m=m.map((function(r){return t(r/y)*y}))}if(n==="reverse"){m=m.map((function(r){return i?r<0?r*-1:-r:Math.abs(y-r)}))}}var B=v?(d-l)/y:l;return g+B*(Math.round(m[e]*100)/100)+h}}function Mr(r){if(r===void 0)r={};var e=mr(r);e.duration=0;e.add=function(t,a){var i=lr.indexOf(e);var u=e.children;if(i>-1){lr.splice(i,1)}function o(r){r.passThrough=true}for(var s=0;s<u.length;s++){o(u[s])}var c=x(t,M(n,r));c.targets=c.targets||r.targets;var v=e.duration;c.autoplay=false;c.direction=e.direction;c.timelineOffset=f.und(a)?v:j(a,v);o(e);e.seek(c.timelineOffset);var l=mr(c);o(l);u.push(l);var d=sr(u,r);e.delay=d.delay;e.endDelay=d.endDelay;e.duration=d.duration;e.seek(0);e.reset();if(e.autoplay){e.play()}return e};return e}mr.version="3.1.0";mr.speed=1;mr.running=lr;mr.remove=br;mr.get=S;mr.set=ur;mr.convertPx=E;mr.path=W;mr.setDashoffset=H;mr.stagger=wr;mr.timeline=Mr;mr.easing=p;mr.penner=d;mr.random=function(r,e){return Math.floor(Math.random()*(e-r+1))+r};r("a",mr)}}}));