import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-brand">Shanoj Voice App</div>
      <ul className="nav-links">
        <li><Link to="/">Clone Voice</Link></li>
        <li><Link to="/generate">Generate Speech</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation; 