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
			buildTools: ['ReactJS', 'w3css'],
			persons: [{name: "Ukor", age: 20}, {name: "Jidechi", age: 21}, {name: "Ekundayo", age: 22}]
		}
	}
	render()
	{
		return (
			<div className="w3-container main-container">
				<Navbar app_name={this.state.app_name} />
				<Form persons={this.state.persons} />
				<Footer app_name={this.state.app_name} />
			</div>
		);
	}
}


export default App;