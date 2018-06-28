import React, { Component } from "react";
import Navbar from "./skeleton/Header";
import Footer from "./skeleton/Footer";
import Form from "./Form";

class App extends Component{

	constructor(props)
	{
		super(props);
		this.state = {
			app_name: "Currency Converter",
			app_version: "v1.0.0",
			buildTools: ["ReactJS", "w3css", "Currency Converter API", "IndexDB (IDB)", "Service Worker"],
		}
	}
	render()
	{
		return (
			<div className="w3-container main-container">
				<Navbar app_name={this.state.app_name} />
				<Form />
				<Footer bt={this.state.buildTools} app_name={this.state.app_name} />
			</div>
		);
	}
}


export default App;