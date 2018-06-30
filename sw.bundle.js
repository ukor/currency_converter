!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=16)}({16:function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(3));var o="currency_converter_v1.0";self.addEventListener("install",function(e){var t=new URL(e.request.url).origin.startsWith("https://ukor.github.io")?["https://ukor.github.io/currency_converter/","https://ukor.github.io/currency_converter/app.bundle.js"]:["/","/app.bundle.js"];e.waitUntil(caches.open(o).then(function(e){return e.addAll(t)}).catch(function(e){console.log(e)}))}),self.addEventListener("fetch",function(e){var t=new URL(e.request.url);console.log(t.origin,t.href,t),t.origin===location.origin&&e.respondWith(caches.match(e.request).then(function(t){return t||fetch(e.request)})),"https://free.currencyconverterapi.com/api/v5/currencies"===t.href&&e.respondWith(r.default.count().then(function(e){if(e<=0)return fetch(t.href)})),t.href.startsWith("https://free.currencyconverterapi.com/api/v5/convert")}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return console.log("cache name ",e),Promise.all(cacheNames.filter(function(e){return e.startsWith("currency-converter")&&e!==o}).map(function(e){return o.delete(e)}))}))})},2:function(e,t,n){"use strict";!function(){function t(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function n(e,n,r){var o,i=new Promise(function(i,c){t(o=e[n].apply(e,r)).then(i,c)});return i.request=o,i}function r(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return n(this[t],o,arguments)})})}function i(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function c(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return function(e,t,r){var o=n(e,t,r);return o.then(function(e){if(e)return new s(e,o.request)})}(this[t],o,arguments)})})}function u(e){this._index=e}function s(e,t){this._cursor=e,this._request=t}function a(e){this._store=e}function f(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new f(n)}function l(e){this._db=e}r(u,"_index",["name","keyPath","multiEntry","unique"]),o(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),c(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),r(s,"_cursor",["direction","key","primaryKey","value"]),o(s,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(s.prototype[e]=function(){var n=this,r=arguments;return Promise.resolve().then(function(){return n._cursor[e].apply(n._cursor,r),t(n._request).then(function(e){if(e)return new s(e,n._request)})})})}),a.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},a.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},r(a,"_store",["name","keyPath","indexNames","autoIncrement"]),o(a,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),c(a,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),i(a,"_store",IDBObjectStore,["deleteIndex"]),f.prototype.objectStore=function(){return new a(this._tx.objectStore.apply(this._tx,arguments))},r(f,"_tx",["objectStoreNames","mode"]),i(f,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new a(this._db.createObjectStore.apply(this._db,arguments))},r(p,"_db",["name","version","objectStoreNames"]),i(p,"_db",IDBDatabase,["deleteObjectStore","close"]),l.prototype.transaction=function(){return new f(this._db.transaction.apply(this._db,arguments))},r(l,"_db",["name","version","objectStoreNames"]),i(l,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[a,u].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t=function(e){return Array.prototype.slice.call(e)}(arguments),n=t[t.length-1],r=this._store||this._index,o=r[e].apply(r,t.slice(0,-1));o.onsuccess=function(){n(o.result)}})})}),[u,a].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(o){n.iterateCursor(e,function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():o(r)):o(r)})})})});var d={open:function(e,t,r){var o=n(indexedDB,"open",[e,t]),i=o.request;return i&&(i.onupgradeneeded=function(e){r&&r(new p(i.result,e.oldVersion,i.transaction))}),o.then(function(e){return new l(e)})},delete:function(e){return n(indexedDB,"deleteDatabase",[e])}};e.exports=d,e.exports.default=e.exports}()},3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(2));function o(){this.version=1,this.dbPromise=r.default.open("currency-conveter",this.version,function(e){e.createObjectStore("currency-db",{keyPath:"id"})})}o.prototype.count=function(){return this.dbPromise.then(function(e){return e.transaction("currency-db").objectStore("currency-db").count()})},o.prototype.cache=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).contents,t=void 0===e?{}:e;this.dbPromise.then(function(e){var n=e.transaction("currency-db","readwrite");return Object.keys(t).map(function(e){n.objectStore("currency-db").put(t[e])}),n.complete}).then(function(){console.log("Stored currency list in IndexDB")})},o.prototype.getAll=function(){return this.dbPromise.then(function(e){return e.transaction("currency-db").objectStore("currency-db").getAll()})},t.default=new o}});