(this.webpackJsonptimestamp=this.webpackJsonptimestamp||[]).push([[0],{27:function(e,t,n){},32:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(15),i=n.n(r),s=(n(27),n(18)),o=n(2),l=n(21),j=n(22),u=n(38),m=n(16),b=n.n(m),d=n(4);var f=function(){var e=Object(c.useState)((function(){var e=localStorage.getItem("recent");return JSON.parse(e)||[]})),t=Object(j.a)(e,2),n=t[0],a=t[1];return Object(c.useEffect)((function(){localStorage.setItem("recent",JSON.stringify(n))})),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"clear",onClick:function(){a([])},children:"Clear Storage"}),Object(d.jsxs)("div",{className:"welcome",children:[Object(d.jsx)("p",{children:"Kenny's Time Log"}),Object(d.jsx)("div",{className:"button-board",children:Object(d.jsx)(u.a,{onClick:function(){a((function(e){return[].concat(Object(l.a)(e),[b()().format("MMMM Do YYYY h:mm:ss a")])})),localStorage.getItem("recent")},children:"Log Time Now"})}),Object(d.jsx)("div",{className:"list",children:n.slice(0).reverse().map((function(e){return Object(d.jsxs)("p",{children:[" ",e]})}))})]})]})};n(32);var O=function(){return Object(d.jsx)(s.a,{basename:"/timestamp",children:Object(d.jsx)(o.a,{exact:!0,path:"/",component:f})})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,39)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),r(e),i(e)}))};i.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(O,{})}),document.getElementById("root")),h()}},[[36,1,2]]]);
//# sourceMappingURL=main.0b861103.chunk.js.map