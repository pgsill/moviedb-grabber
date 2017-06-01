import React, { Component } from 'react';

import Menu from './menu';

export default class Home extends Component{
	constructor(props) {
	  super(props);
	}

	render(){
		return (
			<div>
			<Menu />
			</div>
			)
	}
}