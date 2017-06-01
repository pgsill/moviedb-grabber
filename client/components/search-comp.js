import React, { Component } from 'react';
import ReactFormLabel from './react-form-label';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import MovieComp from './movie-component';

var debounceVar;
var renderedResults;

export default class SearchComp extends Component{
	constructor(props) {
    	super(props);
    	this.state = {value: "", currentResults: []};
    	this.getMovies = this.getMovies.bind(this);
	}

	handleSearchInput(e){
		this.setState({value: e.target.value, currentResults: []});
		this.debounce(this.getMovies, 1000);
		renderedResults = "";
	}

	/*Maps the results of getContent() into MovieComp components*/
	mapToComps(obj){ 
		let returnComp = function (element){
			return <MovieComp key={element.id} content={element} />
		}

		if(obj.results.length != 0){
			renderedResults = (obj.results).map(returnComp);
		}
		else{
			renderedResults = <div>No hits! Try searching for different terms.</div>
			console.log(renderedResults);
		}

		this.setState({currentResults: obj.results});
	} 

	/*Gets movies by search query*/
	getMovies(){
		let value = this.state.value;
		fetch('http://localhost:8080/api/search/' + value)
		.then(res => res.json())
      	.then(json => {
      		json = JSON.parse(json);
      		this.mapToComps(json);
      	})
	}

	debounce(func, wait){
		clearTimeout(debounceVar);
		debounceVar = setTimeout(func, wait);
	}

	conditionalRender(){

		if(this.state.value && !renderedResults){
			return (
				<div className="progress">
					<div className="indeterminate"></div>
				</div>
			);
		}
		else{
			return renderedResults;
		}
	}


	render(){
		return (
			<div className="container">
				<div className="movie-search-box">
					<ReactFormLabel htmlFor="search-bar" title="Search" />
					<input name="search-bar" type="text" value={this.state.value} onChange={this.handleSearchInput.bind(this)}/>
				</div>

				<CSSTransitionGroup
				          transitionName="example"
				          transitionEnterTimeout={500}
				          transitionLeaveTimeout={300}
				          transitionName="example"
			               transitionAppear={true}
			               transitionAppearTimeout={500}
			               transitionEnter={true}
			               transitionLeave={true}>
						{this.conditionalRender()}			
				</CSSTransitionGroup>
			</div>
		)
	}
}