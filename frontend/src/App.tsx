import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './components/Signup'
import Search from './components/Search'
import Favs from './components/Favorites'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
   const token = window.localStorage.getItem('token')
   if(token) {
    setIsLoggedIn(true)
   }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/favorites" render={() => {
            if (isLoggedIn) {
              return <Favs />;
            } else {
              return <Redirect to="/" />;
            }}} />
          <Route exact path="/search" render={() => {
            if (isLoggedIn) {
              return <Search />;
            } else {
              return <Redirect to="/" />;
            }}} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
