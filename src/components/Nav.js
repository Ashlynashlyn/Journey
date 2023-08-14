import React from 'react';
import { NavLink } from 'react-router-dom';

export function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink to="/introduction" className="navbar-brand">Journemo: Your Travel Planner</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink to="/Input" className="nav-link">Start</NavLink></li>
            <li className="nav-item"><NavLink to="/AddEvent" className="nav-link">Add</NavLink></li>
            <li className="nav-item"><NavLink to="/Planner" className="nav-link">Plan</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
