import idb from "idb";


function cache_currency() {
	this.version = 1;
	this.dbPromise = idb.open("currency-conveter", this.version, (upgradeDb) => {
		let keyValStore = upgradeDb.createObjectStore("currency-db", { keyPath: "id" });
	});

}

/**
 * Counts the number of currency in the database
 * */
cache_currency.prototype.count = function () {
	return this.dbPromise.then((db) => {
		const tx = db.transaction("currency-db");

		return tx.objectStore("currency-db").count() // object to store goes here

	});
}

/**
 * Caches currency list
 * */
cache_currency.prototype.cache = function ({ contents = {} } = {}) {
	this.dbPromise.then((db) => {
			const tx = db.transaction("currency-db", "readwrite");

			// iterate through the object then cache it
			Object.keys(contents).map((key) =>
			{
				tx.objectStore("currency-db").put(contents[key]);
			})

			/** This does not mean that the operation was successful */
			return tx.complete;
		}).then(() => {
			console.log("Stored currency list in IndexDB");
		});
}

/** Fetches */
cache_currency.prototype.getAll = function () {

	return this.dbPromise.then((db) => {
		return db.transaction('currency-db')
		  .objectStore('currency-db').getAll();
	  });
}


export default new cache_currency;