import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';

import { getCurrentUser, logout } from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Public from './components/Public';
import CatList from './components/Cats';
import FavoriteList from './components/Favorites';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(undefined);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(undefined);
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {currentUser && currentUser['email'] &&
          <Link to={"/cats"} className="navbar-brand">
            Cats everywhere !!
          </Link>}
        {currentUser && !currentUser['email'] &&
          <Link to={"/"} className="navbar-brand">
            Hidden cats
          </Link>}
        <div className="navbar-nav mr-auto">
          {currentUser && currentUser['email'] &&
            <>
              <li className="nav-item">
                <Link to={"/cats"} className="nav-link">
                  Cats
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/favorites"} className="nav-link">
                  Favorites
                </Link>
              </li>
            </>
          }

          {currentUser && currentUser['email'] &&
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser['email']}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/logout" className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </div>}
          {currentUser && !currentUser['email'] &&
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>}
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Public} />
          <Route exact path="/cats" component={CatList} />
          <Route exact path="/favorites" component={FavoriteList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </>
  );
}

export default App;
