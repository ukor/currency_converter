import IDBcurrency_list from "../indexDB/currency_list";

let cache_name = "currency_converter_v1.0";

// install cache
self.addEventListener("install", (event) => {
	let requestUrl = new URL(event.target.location);
	
	/** fix issue #1 */
	let url_to_cache = requestUrl["origin"].startsWith("https://ukor.github.io")
	? [
		"https://ukor.github.io/currency_converter/",
		"https://ukor.github.io/currency_converter/app.bundle.js"
	] :
	[
		"/",
		"/app.bundle.js"
	];
	console.log(url_to_cache);
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

	/**
	 * Intercept request to free.currencyconverterapi.com
	 * */
	if(requestUrl.href === "https://free.currencyconverterapi.com/api/v5/currencies")
	{
		/**
		 * Todo, do all the caching and fetch to/from IndexDb here instead of in the component Form.js
		 * */
		event.respondWith(
			IDBcurrency_list.count().then((count) =>{
				if(count <= 0)
				{
					return fetch(requestUrl.href);
				}
			})
		);
	}

	/**
	 * Intercept request for conversion rate
	 * */
	if(requestUrl.href.startsWith("https://free.currencyconverterapi.com/api/v5/convert")){
		/**
		 * Todo, do all the caching and fetch to/from IndexDb here instead of in the component Form.js
		 * */
	}

});


self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
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