import React, { Component } from 'react';

import Menu from './menu';

import CompB from './compb';

export default class Home extends Component{
	constructor(props) {
	  super(props);
	}

	render(){
		return (
			<div>
			<Menu />
			<CompB />
			</div>
			)
	}
}