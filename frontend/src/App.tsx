import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import FavoritesPage from './Components/FavoritesPage';
import SearchPage from './Components/SearchPage';

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
            </ul>
          </div>
            <Route exact path="/" component={SearchPage} />
            <Route path="/favorites" component={FavoritesPage} />
        </Router>
      </div>
    );
  }
  
  
export default App;
