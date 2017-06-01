/*Lists popular movies (which are contained in a MovieComp component)*/

import React, { Component } from 'react';

import MovieComp from './movie-component';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class PopularMovies extends Component{
	constructor(props) {
	  super(props);
	}

	/*Grabs popular movies from the server*/
	getContent(){
		fetch('http://localhost:8080/api/popular')
		.then(res => res.json())
      	.then(json => {
      		json = JSON.parse(json);
      		this.setState(json);
      	})
      	.then(json => {
      		this.mapToComps()
      	})
	}

	componentWillMount() {
		this.getContent()
	}

	/*Maps the results of getContent() into MovieComp components*/
	mapToComps(){ 
			let results = this.state.results;
			let returnComp = function (element){
				return <MovieComp key={element.id} content={element} />
			}
			return results.map(returnComp);
	} 

	conditionalRender(){
		if (!this.state) {
		  return (
		     <div className="preloader-wrapper big active">
		    		      <div className="spinner-layer spinner-blue-only">
		    		        <div className="circle-clipper left">
		    		          <div className="circle"></div>
		    		        </div><div className="gap-patch">
		    		          <div className="circle"></div>
		    		        </div><div className="circle-clipper right">
		    		          <div className="circle"></div>
		    		        </div>
		    		      </div>
		   	</div>
		  )}
		else{
			return this.mapToComps()
		}
	}

	render(){
		return (
			<div className="container">
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
	)}
}