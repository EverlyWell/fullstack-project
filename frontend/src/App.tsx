import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Cats from './components/Cats';
import Login from './components/Login';

import { getCurrentUser, logout } from './services/auth.service';
import Register from './components/Register';
import Profile from './components/Profile';

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
        <Link to={"/"} className="navbar-brand">
          Cats everywhere !!
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Cats
            </Link>
          </li>

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
          <Route exact path={["/", "/home", "/cats"]} component={Cats} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </>
  );
}

export default App;
