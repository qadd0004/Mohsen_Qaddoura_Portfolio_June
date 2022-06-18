/**
 * Copyright 2018-2021 Typetura LLC
 * typetura.com

 * typetura.js is subject to the Typetura platform license
 * https://docs.typetura.com/legal/copyright

 * US Patent US10769348B1
 */"use strict"; (function (a) { "function" == typeof define && define.amd ? define(a) : a() })(function () {
     'use strict'; function a(a, c) { if (a) { if ("string" == typeof a) return b(a, c); var d = Object.prototype.toString.call(a).slice(8, -1); return "Object" === d && a.constructor && (d = a.constructor.name), "Map" === d || "Set" === d ? Array.from(d) : "Arguments" === d || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d) ? b(a, c) : void 0 } } function b(a, b) { (null == b || b > a.length) && (b = a.length); for (var c = 0, d = Array(b); c < b; c++)d[c] = a[c]; return d } function c(b) { if ("undefined" == typeof Symbol || null == b[Symbol.iterator]) { if (Array.isArray(b) || (b = a(b))) { var c = 0, d = function () { }; return { s: d, n: function n() { return c >= b.length ? { done: !0 } : { done: !1, value: b[c++] } }, e: function e(a) { throw a }, f: d } } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") } var e, f, g = !0, h = !1; return { s: function s() { e = b[Symbol.iterator]() }, n: function n() { var a = e.next(); return g = a.done, a }, e: function e(a) { h = !0, f = a }, f: function f() { try { g || null == e["return"] || e["return"]() } finally { if (h) throw f } } } } var d = function (a) { if ("undefined" != typeof window.ResizeObserver) { var b = new window.ResizeObserver(function (a) { window.requestAnimationFrame(function () { if (Array.isArray(a) && a.length) { var b, d = c(a); try { for (d.s(); !(b = d.n()).done;) { var e = b.value; e.contentRect && e.target.style.setProperty("--tt-bind", e.contentRect.width) } } catch (a) { d.e(a) } finally { d.f() } } }) }); b.observe(a) } }, e = function (a) {
         var b = a.base, c = a.scale, d = document.createElement("style");// Create a stylesheet for typetura's custom properties
         return d.innerHTML = "html{--tt-base: ".concat(b, ";--tt-scale: ").concat(c, ";--tt-ease:linear;--tt-max:1600}*,:before,:after,html{--tt-key:none;animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s * var(--tt-bind) / var(--tt-max)) both paused}"), d
     }; window.typetura = window.typetura || { selectors: [".typetura"], base: 20, scale: 1 }, function () {
         var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {}, b = a.selectors || [".typetura"], c = a.base || 20, f = a.scale || 1; return new Promise(function (a) {// Loop through new elements and attach resize observations.
             // Look for new elements on the page that might be Typetura contexts.
             var g = new window.MutationObserver(function (a) { a.forEach(function (a) { var c = a.addedNodes; c.forEach(function (a) { a.classList && a.matches(b) && d(a) }) }) }); g.observe(document.documentElement, { childList: !0, attributes: !1, subtree: !0 }); var h = e({ base: c, scale: f });// Initiate Typetura on the root element
             // Write typetura properties to the top of the document head to avoid cascade conflicts
             d(document.documentElement), document.head.insertBefore(h, document.head.firstChild), a()
         })
     }(window.typetura)
 });
