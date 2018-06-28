import React, { Component } from "react";

class Navbar extends Component
{
	render(){
		return (
			<div className="w3-center">
				<h1>{this.props.app_name}</h1>
			</div>
		);
	}
}


export default Navbar;