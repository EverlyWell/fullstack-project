import React, { Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import HeaderWithRouter from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Fragment>
          <HeaderWithRouter />
          <Container>
            <Route path="/home" exact component={Home} />
            <Route path="/favorites" exact component={Favorites} />
          </Container>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
