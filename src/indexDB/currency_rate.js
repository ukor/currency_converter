import idb from "idb";


function cache_currency_pairs() {
	this.version = 1;
	this.databaseName = "currency-conveter-pairs";
	this.objStore = "currency-pairs-db";

	/** Initialize IndexDB */
	this.dbPromise = idb.open(this.databaseName, this.version, (upgradeDb) => {
		let keyValStore = upgradeDb.createObjectStore(this.objStore, { keyPath: "pairs" });
	});

}

/**
 * Counts the number of currency in the database
 * */
cache_currency_pairs.prototype.count = function (currency_pairs = "USD_NGN") {
	return this.dbPromise.then((db) => {
		const tx = db.transaction(this.objStore);

		return tx.objectStore(this.objStore).count(currency_pairs) // object to store goes here

	});
}

/**
 * Caches currency pairs and there conversion rate
 * */
cache_currency_pairs.prototype.cache = function (contents = { pairs: "", rate: "" }) {
	this.dbPromise.then((db) => {
			const tx = db.transaction(this.objStore, "readwrite");

			// {pairs: "USD_NGN", rate: }
		console.log(contents);
			tx.objectStore(this.objStore).put(contents);

			/** This does not mean that the operation was successful */
			return tx.complete;
		}).then(() => {
			console.log("Stored currency list in IndexDB");
		});
}

/** Get currency by pairs */
cache_currency_pairs.prototype.get_by_pairs = function(currency_pairs = "USD_NGN")
{
	return this.dbPromise.then((db) => {
		return db.transaction(this.objStore).objectStore(this.objStore).get(currency_pairs);
	})
}

/** Fetches */
cache_currency_pairs.prototype.getAll = function () {

	return this.dbPromise.then((db) => {
		return db.transaction(this.objStore)
		  .objectStore(this.objStore).getAll();
	  });
}


export default new cache_currency_pairs;