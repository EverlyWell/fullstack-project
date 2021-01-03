import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import FavoritesPage from './Components/FavoritesPage';
import SearchPage from './Components/SearchPage';
import LoginPage from './Components/LoginPage';
import RegistrationPage from './Components/RegistrationPage';

function App() {
    return (
      <div className='App'>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
            <Route exact path="/" component={SearchPage} />
            <Route path="/favorites" component={FavoritesPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegistrationPage} />
        </Router>
      </div>
    );
  }
  
  
export default App;
