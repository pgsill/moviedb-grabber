import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class MovieComp extends Component{
	constructor(props) {
	  super(props);
	}

	/*Gets content from the server using this component's props*/
	getContent(props){
		console.log(props.url)
		return fetch(props.url)
		 .then((response) => {
		   if(response.status === 200 && response.ok === true) {
		     return response.json();
		   }
		 })
		 .then(json => {
		 	console.log(JSON.parse(json));
		 	this.setState(JSON.parse(json));
		 })    	
	}

	componentWillMount(){
		this.setState(this.props.content)
	}

	render(){
		if (!this.state) {
		  return (
		    <img src="http://i.imgur.com/bYaHiD6.gif" />
		  )
		}

		return (

		<div className="movie">
		    <div className="card small horizontal grey darken-4">
			    <div className="card-image">
					<img src={"https://image.tmdb.org/t/p/w150" + this.state.poster_path} className="movie-poster"/>
				</div>

				<div className="card-stacked">
			       <div className="card-content">
						<div className="movie-info blue-grey-text text-lighten-5">
						<div className="movie-title">{this.state.title}</div>
						<div className="movie-date">📅 {(this.state.release_date).substring(0,4)}</div>
						<div className="movie-score">🌟 {this.state.vote_average}</div>
						<div className="movie-tagline">{(this.state.overview)}</div>
					</div>
				</div>
				
				<div className="card-action">
					<Link className="blue-text text-lighten-1" to={'/movie/' + this.state.id}>More info</Link>
				</div>				
				</div>
			</div>
		</div>
	)}
}