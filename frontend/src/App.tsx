import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import './App.css';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Cats everywhere !!
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            Cats
          </li>
          <li className="nav-item">
            Add
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        [Add cats table here]
      </div>
    </>
  );
}

export default App;
