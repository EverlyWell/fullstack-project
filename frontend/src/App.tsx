import React, { Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import * as Cookies from 'js-cookie';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AuthenticatedRoute from './routes/AuthenticatedRoute';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { updateToken } from './store/auth/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('userToken');

  if (token) {
    dispatch(updateToken(token));
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <AuthenticatedRoute path="/home">
            <Home />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/favorites">
            <Favorites />
          </AuthenticatedRoute>
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
