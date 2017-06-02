import React from 'react';
import { BrowserRouter as Router, Route, Match } from 'react-router-dom';

import Menu from './menu';

import MovieDetail from './movie-detail';
import PopularMovies from './popular-movies';
import SearchComp from './search-comp';

function App(props) {
  return (
  <Router>
    <div>
      <div className="header">
        <Route path="/" component={Menu}/>
      </div>
      <Route exact path="/" component={SearchComp} />
      <Route path="/popular" component={PopularMovies} />
      <Route path="/movie/" component={MovieDetail} />
    </div>
  </Router>);
}

export default App;
