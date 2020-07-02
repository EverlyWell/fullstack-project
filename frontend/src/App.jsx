import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Container from '@material-ui/core/Container'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'

function App() {
  return (
    <Router>
      <Container component="main">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App
