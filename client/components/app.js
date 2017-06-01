import React from 'react';
import { BrowserRouter as Router, Route, Match } from 'react-router-dom';

import Home from './home';
import Menu from './menu';

import CompA from './compa';
import CompB from './compb';
import LoginPage from './login-page';
import TestComp from './testcomp';

function requireAuth(){
  console.log("ayy")
}

function App(props) {
  return (
  <Router>
    <div>
      <div className="header">
        <Route path="/" component={Menu}/>
      </div>
      <Route exact path="/" component={CompB} />
      <Route path="/login" component={LoginPage} />
      <Route path="/compb" component={CompB} />
      <Route path="/movie/" component={CompA} />

      <Route path="/testcomp" render={() => (<TestComp comp={<LoginPage />} />)} />
    </div>
  </Router>);
}

export default App;
