   
import React from 'react';
import { Link } from 'react-router-dom';

   
const Menu = (props) => (
  <div>
    <ul>
      <li><a className="brand" href="/#">Decoreba</a></li>
      <li><Link to={'/compa'}>Comp A</Link></li>
      <li><Link to={'/compB'}>Comp B</Link></li>
    </ul>
  </div>
);

export default Menu;
