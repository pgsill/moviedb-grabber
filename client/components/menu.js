   
import React from 'react';
import { Link } from 'react-router-dom';

   
const Menu = (props) => (
  <div>
    <ul>
      <li><a className="brand" href="/#">MovieDB の Grabba</a></li>
      <li><Link to={'/compb'}>Popular</Link></li>
      <li><Link to={'/login'}>Login</Link></li>
    </ul>
  </div>
);

export default Menu;
