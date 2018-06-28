import React, { Component } from "react";
import axios from "axios";
import IDB_currency_list from "../indexDB/currency_list";
import IDB_currency_pairs from "../indexDB/currency_rate";

class Form extends Component {
	constructor(props) {
		super(props);
		this.state =
			{
				currency_endpoint: `https://free.currencyconverterapi.com/api/v5/currencies`,
				// ${currency_pairs},${currency_pair_reverse}&compact=ultra
				conversion_endpoint: `https://free.currencyconverterapi.com/api/v5/convert?q=`,
				error: false,
				currencies: [],
				from_currency: "",
				to_currency: "",
				amount: "",
				conversionResult: ""
			}

		/** Binds */
		this.amountChanged = this.amountChanged.bind(this);
		this.amountFocusedOn = this.amountFocusedOn.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.fromChanged = this.fromChanged.bind(this);
		this.toChanged = this.toChanged.bind(this);
	}

	componentDidMount() {
		/**
		 * Make network request, only if there are no data in IndexDb
		 * */
		IDB_currency_list.count()
			.then((count) => {
				if (count > 0) {
					/** fetch currency list from index db */
					IDB_currency_list.getAll().then((response) => {
						this.setState({ currencies: response });
					});
				}
				else {
					// no cache currency list, make network request
					fetch(this.state.currency_endpoint)
						.then((response) => {
							return response.json();
						}).then((json_resp) => {
							let resp = json_resp.results;

							/** Cache the currency */
							IDB_currency_list.cache({ contents: resp });

							let r = [];
							Object.keys(resp).map((key) => {
								r.push(resp[key])
							})
							this.setState({ currencies: r });
						})
						;
				}
			}
			);

	}

	/**
	 * Handles state for currency you want to convert from
	 * */
	fromChanged(event) {
		this.setState({ from_currency: event.target.value });
		console.log(event.target.value);
	}

	/**
	 * Handles state for currency you want to convert to
	 * */
	toChanged(event) {
		this.setState({ to_currency: event.target.value });
	}

	/**
	 * Handles state for amount that want to be converted
	 * */
	amountFocusedOn(event) {
		if (this.state.from_currency === "") {
			console.warn("Select the currency you will like to convert from")
		}
		else if (this.state.to_currency === "") {
			console.warn("Select the currency you will like to convert to")
		}
		else if (this.state.to_currency === this.state.from_currency) {
			console.warn("Silly, You can't convert same currency.");
		}
	}
	amountChanged(event) {
		this.setState({ amount: event.target.value })
	}

	/** Handles form submision */
	submitForm(event) {
		event.preventDefault();
		let _from = this.state.from_currency;
		let _to = this.state.to_currency;
		let _amt = this.state.amount;
		if ((_from === "") || (_to === "")) {
			console.warn("All fields need to be provided");
		}
		else if (_from === _to) {
			console.warn("Silly, You can't convert same currency.");
		}
		else {
			// send to api for conversion
			let currency_pairs = `${_from}_${_to}`;
			let currency_pairs_reverse = `${_to}_${_from}`;
			/**
			 * check if currency pairs conversion rate is availble in IndexDB
			 * */
			IDB_currency_pairs.count(currency_pairs)
				.then((count) => {
					if (count > 0) {
						// use rate from indexDB
						let rate = IDB_currency_pairs.get_by_pairs(currency_pairs).then((response) => {
							console.log(response["rate"])
							if (_amt === "") {
								// coversion rate
								this.setState({ conversionResult: `${response["rate"]} ${_to}` });
							}
							else {
								this.setState({ conversionResult: `${response["rate"] * _amt} ${_to}` });
							}
						});

					}
					else {
						/**
						 * Make network rquest for pairs and reverse pairs
						 * */
						let url = `${this.state.conversion_endpoint}${currency_pairs},${currency_pairs_reverse}&compact=ultra`;
						axios.get(url).then((response) => {
							/**
							 * Cached response for offline use
							 * */
							IDB_currency_pairs.cache({pairs: currency_pairs, rate: response.data[currency_pairs]});
							IDB_currency_pairs.cache({pairs: currency_pairs_reverse, rate: response.data[currency_pairs_reverse]});
							console.log(response.data);
							console.log(response.data[currency_pairs]);
							if (_amt === "") {
								// coversion rate
								this.setState({ conversionResult: response.data[currency_pairs] });
							}
							else {
								this.setState({ conversionResult: response.data[currency_pairs] * _amt });
							}

						})
					}
				})

		}
	}
	render() {
		return (
			<div className="w3-light-grey w3-card-4 form-container">
				<form onSubmit={this.submitForm} className="w3-container">
					<p>
						<label>Convert From: </label>
						<select onChange={this.fromChanged} className="w3-select w3-border" name="from_currency">
							<option >Select a currency to convert from </option>

							{
								Object.keys(this.state.currencies).map((key) =>
									<option key={this.state.currencies[key].id} value={this.state.currencies[key].id}>{this.state.currencies[key].currencyName}</option>
								)
							}
						</select>
					</p>
					<p>
						<label>To: </label>
						<select onChange={this.toChanged} className="w3-select w3-border" name="option">
							<option >Select a currency to convert to </option>
							{
								Object.keys(this.state.currencies).map((key) =>
									<option key={this.state.currencies[key].id} value={this.state.currencies[key].id}>{this.state.currencies[key].currencyName}</option>
								)
							}
						</select>
					</p>

					<p>
						<label>Amount </label>
						<input onFocus={this.amountFocusedOn} onChange={this.amountChanged} className="w3-input" type="number" />
					</p>

					<p>
						<label>Result <span id="from_"></span></label>
						<input readOnly value={this.state.conversionResult} className="w3-input" type="text" />
					</p>
					<p>
						<input type="submit" value="Convert" className="w3-button w3-block w3-teal" />
					</p>
				</form>
				<div className="w3-blue">
					<h4 className="w3-center">{this.state.conversionResult}</h4>
				</div>
			</div>
		);
	}
}


export default Form;