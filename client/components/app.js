import React from 'react';
import { index as Index, BrowserRouter as Router, Route, Match } from 'react-router-dom';

import Home from './home';
import Menu from './menu';

import CompA from './compa';
import CompB from './compb';
import LoginPage from './login-page';

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
      <Route path="/movie/" component={CompA} onEnter={requireAuth()} />
    </div>
  </Router>);
}

export default App;
