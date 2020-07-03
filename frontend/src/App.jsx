import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom"
import Container from '@material-ui/core/Container'
import Login from './Login'
import Home from './Home'
import AuthenticatedRoute from './AuthenticatedRoute'
import UnauthenticatedRoute from './UnauthenticatedRoute'
import { connect } from 'react-redux'
import { setAuthToken, setAuthLoaded } from './actions/index'
import Cookies from 'js-cookie'

function App({ setAuthToken, setAuthLoaded }) {
  let authToken = Cookies.get('userToken')
  if(authToken && authToken.length) {
    setAuthToken(authToken)
  }
  setAuthLoaded(true)

  return (
    <Router>
      <Container component="main">
        <Switch>
          <UnauthenticatedRoute path="/login">
            <Login screen="login" />
          </UnauthenticatedRoute>

          <UnauthenticatedRoute path="/signup">
            <Login screen="signup" />
          </UnauthenticatedRoute>

          <AuthenticatedRoute path="/">
            <Home />
          </AuthenticatedRoute>
        </Switch>
      </Container>
    </Router>
  )
}

export default connect(
  null,
  { setAuthToken, setAuthLoaded }
)(App)
