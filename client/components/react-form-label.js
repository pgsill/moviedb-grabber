import React, {Component} from 'react';

export default class ReactFormLabel extends Component {
 constructor() {
  super();
 }

 render() {
  return(
   <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
  )
 }
}