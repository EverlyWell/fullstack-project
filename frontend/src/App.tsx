import React from 'react';
import './App.css';
import Photos from "./components/Photos"
import Favorites from "./components/Favorites"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Navbar from "./components/Navbar"
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <main>
        <Navbar />
        <Switch>
            <Route path="/" component={Photos} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/favorites" component={Favorites} exact />
        </Switch>
      </main>
    </div>
  );
}

export default App;
