/* Individual movie page component */
/* Shows movie plot, score, links to trailers and cast */

import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import CircularProgressbar from 'react-circular-progressbar';

export default class MovieDetail extends Component{
	constructor(props) {
	  super(props);
	}

	getContent(url){
		return fetch(url)
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
		let url = "/api" + this.props.location.pathname;
		this.getContent(url);
	}

	renderStarring(){
		let cast = this.state.credits.cast;

		let castJsx = cast.map(function(element, index){
			return (
				<div className="col s4" key={index}>

				<div className="card blue-grey-text text-darken-4" >
					<div className="card-image">
						<img src={"https://image.tmdb.org/t/p/w138_and_h175_bestv2" + element.profile_path} />
					</div>
					<div className="card-content lessPadding">
						<div className="castActor">
							<b>{element.name}</b>
						</div>
						<div className="castRole">
							{element.character}
						</div>
					</div>
				</div>
				</div>
			)
		})

		return (
		<div className="row">
		{castJsx.slice(0,3)}
		<div className="detail-ytlink">
			<a className="waves-effect waves-light btn blue" href={"https://www.themoviedb.org/movie/" + this.state.id + "/cast"}>See full cast</a>
		</div>
		</div>
		)
	}

	getVideos(){
		if (this.state.videos.results.length > 0){
			console.log("we have videos");
			if ((typeof this.state.videos.results[0] != "undefined") & (typeof this.state.videos.results[1] != "undefined")){
				console.log("we have two videos");
				return (<div>
					<div className="detail-ytlink">
						<a className="waves-effect waves-light btn blue" 
							href={"https://youtube.com/watch?v=" + this.state.videos.results[0].key}>Trailer: {this.state.videos.results[0].name}</a>
						</div>

						<div className="detail-ytlink">
							<a className="waves-effect waves-light btn blue" 
							href={"https://youtube.com/watch?v=" + this.state.videos.results[1].key}>Trailer: {this.state.videos.results[1].name}</a>
						</div>
					</div>)
			}
			else if ((typeof this.state.videos.results[0] != "undefined") & (typeof this.state.videos.results[1] === "undefined")){
				console.log("we one video");
				return (					
					<div className="detail-ytlink">
						<a className="waves-effect waves-light btn blue" 
							href={"https://youtube.com/watch?v=" + this.state.videos.results[0].key}>Trailer: {this.state.videos.results[0].name}</a>
						</div>
					)
			}
		}
		else{
			console.log("we have no videos :^(")
		}
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
			return (
				<div>
				<div className="detail-container" key="detail-container">
					<div key="detail-poster" className="detail-poster">
						<img src={"https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + this.state.poster_path} />
					</div>

					<div className="detail-backdrop" key="detail-backdrop" style={{backgroundImage: "url(" + 'https://image.tmdb.org/t/p/w1400_and_h450_bestv2/' + this.state.backdrop_path + ")"}}>
						<div className="detail-backdrop-mask"></div>
						
					</div>

					<div key="detail-movie-info" className="detail-movie-info">

						<div className="detail-info">
						
							<div className="detail-title">
								{this.state.title}

								<div className="detail-date">
									{(this.state.release_date).substring(0,4)}
								</div>
							</div>

						

						<div className="detail-score">
							<CircularProgressbar 
							strokeWidth={10} 
							initialAnimation={true} 
							classForPercentage={(percentage) => {
							                return percentage < 50 ? 'CircularProgressbar-path-red' : 'CircularProgressbar-path';
							              }}
							percentage={(this.state.vote_average)*10} />
						</div>

						<div className="detail-overview">
							{this.state.overview}
						</div>

						{this.getVideos()}
						
					</div>

					</div>
				</div>

				<div className="detail-starring">
					<div className="detail-starring-heading">
					Cast
					</div>
					{this.renderStarring()}
				</div>
				</div>
			)
		}
	}

	render(){
		return (
			<div>
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