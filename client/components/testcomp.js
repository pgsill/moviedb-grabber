import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import LoginPage from './login-page';


export default class TestComp extends Component{
  constructor(props) {
    super(props);
    this.state = {loggedIn: false};
  }

  getCookie(name){
      let re = new RegExp(name + "=([^;]+)");
      let value = re.exec(document.cookie);
      return (value != null) ? unescape(value[1]) : null;
    }

  getHasTokenFake(){
    if (this.getCookie("token") != null){
      this.setState({loggedIn: true});
      return true
    }
    else{
      return false
    };
    /*fetch('http://localhost:8080/auth/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.getCookie("token")
      }
    })
    .then(result => result.json())
    .then(json => {
      console.log("Results from /auth/users:");
      console.log(json);
      })
    .catch(err => {
        console.log(err);
    });*/
  }

  getComponent(bLoggedIn){
    let componentToReturn = this.props.comp;

    if(this.state.loggedIn === false){
      return "no auth!"
    }
    else{
    return (
      componentToReturn
      );
    }
  }

  conditionalRender(){
    if (this.state.loggedIn == false || !this.state) {
      this.getHasTokenFake();
      return (        
        "loading"
      )}
    else{
      return (
        <div>
        {this.getComponent()}
        </div>
      )
    }
  }

  render(){
      return (
        <div>
          {this.conditionalRender()}
        </div>
    )}
  }

TestComp.propTypes = {
  comp: PropTypes.element
};

