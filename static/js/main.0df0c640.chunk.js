(this["webpackJsonpsprint-timer"]=this["webpackJsonpsprint-timer"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},20:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(8),i=n.n(r),o=(n(13),n(4)),l=n(24),u=n(25),s=n(26);n(14);var m=15.9155;function f(e,t,n){for(var a=[],c=e;c<=t;)a.push(c),c+=n;return a}function p(e){var t=1e3*Math.round(e/1e3),n=Math.floor(t/1e3%60),a=Math.floor(t/6e4%60);return"".concat(a,":").concat(n)}var d=function(e){var t=e.percentage;return c.a.createElement("g",null,c.a.createElement("circle",{cx:31.831,cy:31.831,r:m,fill:"none",strokeWidth:31.831,strokeDasharray:"".concat(t," 100")}))},E=function(e){return c.a.createElement("g",null,f(0,11,1).map((function(e){var t=function(e){var t=31.831,n=1.4*m,a=31.035225,c=e/180*Math.PI;return[[t+n*Math.cos(c),t+n*Math.sin(c)],[t+a*Math.cos(c),t+a*Math.sin(c)]]}(30*e);return e%3===0?c.a.createElement("line",{key:e,x1:t[0][0],y1:t[0][1],x2:t[1][0],y2:t[1][1],strokeWidth:2,stroke:"black"}):c.a.createElement("line",{key:e,x1:t[0][0],y1:t[0][1],x2:t[1][0],y2:t[1][1],strokeWidth:1,stroke:"black"})})))},v=function(e){var t=Object(a.useState)(!1),n=Object(o.a)(t,2),r=n[0],i=n[1],m=e.totalTime?e.totalTime:36e5,v=Object(a.useState)(0),h=Object(o.a)(v,2),b=h[0],g=h[1],k=Object(a.useState)(36e5),j=Object(o.a)(k,2),O=j[0],S=j[1],T=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=Object(a.useState)({endTime:0,checkpoints:[]}),c=Object(o.a)(n,2),r=c[0],i=c[1],l=Object(a.useState)(Date.now()),u=Object(o.a)(l,2),s=u[0],m=u[1],f=Object(a.useState)(0),p=Object(o.a)(f,2),d=p[0],E=p[1];Object(a.useEffect)((function(){var e=setInterval((function(){var e=Date.now();e>r.endTime&&(e=r.endTime),m(e)}),t);return function(){return clearInterval(e)}}),[r,t]),Object(a.useEffect)((function(){r.checkpoints.length<=d||s<r.checkpoints[d][1]||(e(r.checkpoints[d][0]),E(d+1))}),[r,s,e,d]);var v=function(e,t){var n=Date.now();i({endTime:n+e,checkpoints:t.sort((function(e,t){return e-t})).map((function(e){return[e,n+e]}))}),E(0)};return[r.endTime-s,v]}((function(e){r&&0!==b&&new Notification("".concat(p(N)," Remain")),console.log("alarm: ".concat(e))}),100),M=Object(o.a)(T,2),N=M[0],w=M[1];Object(a.useEffect)((function(){w(b,f(0,1,1/12).map((function(e){return e*m})))}),[b]),Object(a.useEffect)((function(){"Notification"in window&&Notification.requestPermission((function(e){"granted"===e&&i(!0)}))}),[]);return c.a.createElement("div",null,c.a.createElement("p",null," Sprint Timer"),c.a.createElement("div",{className:"circle-timer-clock"},c.a.createElement("svg",{className:"circle-timer-svg",viewBox:"0 0 ".concat(63.662," ").concat(63.662)},c.a.createElement(d,{percentage:100}),c.a.createElement(E,null),c.a.createElement(d,{percentage:100*N/m}))),c.a.createElement("p",null," ",p(N)," Remain "),c.a.createElement("div",{className:"circle-timer-footer"},c.a.createElement(l.a,null,c.a.createElement(l.a.Prepend,null,c.a.createElement(l.a.Text,{id:"timer-time-input"}," Time ")),c.a.createElement(u.a,{placeholder:"MM:SS",defaultValue:"60:00",onChange:function(e){return function(e){if(null!==e.match(/^\d\d:\d\d$/g)){var t=parseInt(e.split(":")[0]),n=1e3*(parseInt(e.split(":")[1])+60*t);console.log("set timer temp : "+n),S(n)}}(e.target.value)}}),c.a.createElement(s.a,{variant:"success",onClick:function(){return g(O)}}," Start "),c.a.createElement(s.a,{variant:"danger",onClick:function(){return g(0)}}," Stop "))))};n(20),n(21);var h=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"}),c.a.createElement("div",{className:"App-content"},c.a.createElement(v,null)),c.a.createElement("footer",{className:"App-footer"}))},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,27)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(h,null)),document.getElementById("root")),b()}},[[22,1,2]]]);
//# sourceMappingURL=main.0df0c640.chunk.js.map