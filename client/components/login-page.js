import React, { Component } from 'react';
import ReactFormLabel from './react-form-label';

export default class LoginPage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			password: ""
		};
	}

	getCookie(name){
	    let re = new RegExp(name + "=([^;]+)");
	    let value = re.exec(document.cookie);
	    return (value != null) ? unescape(value[1]) : null;
	  }

	handleSubmit(e){
		e.preventDefault();

		console.log(this.state);

		fetch('http://localhost:8080/auth/authenticate', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(this.state)
		})
		.then(result => result.json())
		.then(json => {
			document.cookie = "token=" + json.token + ";";
			console.log("Current cookies:");
			console.log(this.getCookie("token"));
		})
		.then(
			fetch('http://localhost:8080/auth/users', {
			  method: 'GET',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			    'x-access-token': this.getCookie("token")
			  }
			})
			.then(result => result.json())
			.then(json => {
				console.log("Results from /auth/users:");
				console.log(json);
			}))
		.catch(err => {
     		console.log(err);
		});


	}

	handleNameChange(e){
		this.setState({name: e.target.value});
	}
	handlePasswordChange(e){
		this.setState({password: e.target.value});
	}

	render(){
		return (
				<div>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<ReactFormLabel htmlFor="name" title="Username" />
						<input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
						
						<ReactFormLabel htmlFor="password" title="Password" />
						<input type="text" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>

						<input type="submit" value="Submit" />
					</form>
				</div>
			)
	}
}
