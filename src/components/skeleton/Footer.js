import React, { Component } from "react";

class Footer extends Component
{
	render(){
		return (
			<div className="w3-center">
				<div>
					<h5>Build Tools</h5>
					{
						this.props.bt.map((tool) => {
							return <span key={tool}> -{tool} </span>
						})
					}
				</div>
				<footer><h4>&copy; 2018 - (MIT) ALC3.0 {this.props.app_name}</h4></footer>
			</div>
		);
	}
}


export default Footer;