
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './menu';

import CompA from './compa';
import CompB from './compb';

function App(props) {
  return (
  <Router>
    <div>
      <div className="header">
        <Route path="/" component={Menu}/>
      </div>
      <Route path="/compa" component={CompA} />
      <Route path="/compb" component={CompB} />
    </div>
  </Router>);
}

export default App;
