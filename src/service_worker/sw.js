import IDBcurrency_list from "../indexDB/currency_list";

let cache_name = "currency_converter_v1.0";
let url_to_cache = [
	"/",
	"/app.bundle.js"
]
// install cache
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(cache_name).then((cache) => {
			return cache.addAll(url_to_cache);
		}).catch( (r) => {console.log(r);})
	);
});

/**
 * Intercept network request,
 * check if the cache exit, if it does server from the cache else make network request
 * */
self.addEventListener("fetch", (event) => {

	let requestUrl = new URL(event.request.url);

	/** for same origin */
	if(requestUrl.origin === location.origin)
	{
		event.respondWith(
			caches.match(event.request) // check if cahce exit
				.then((resp) => {
					if (resp) return resp; // cache exist, server from the cach

					return fetch(event.request); // cahche does not exit, make network request
				})
		);
	}

	

});


self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheName) => {
			console.log("cache name ", cacheNames);
			return Promise.all(
				cacheNames.filter((cacheName) => {
					return cacheName.startsWith('currency-converter') && cacheName !== cache_name;
				}).map((cacheName) => {
					return cache_name.delete(cacheName);
				})
			)
		})
	)
})