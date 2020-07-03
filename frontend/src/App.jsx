import React from 'react'
import './App.css'

// Redux
import { connect } from 'react-redux'
import { setAuthToken, setAuthLoaded } from './actions/index'

// Libraries
import Cookies from 'js-cookie'
import { makeStyles } from '@material-ui/core/styles'

// Library components
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom"
import Container from '@material-ui/core/Container'

// Child components
import Login from './Login'
import Home from './Home'
import Favorites from './Favorites'
import AuthenticatedRoute from './AuthenticatedRoute'
import UnauthenticatedRoute from './UnauthenticatedRoute'

const useStyles = makeStyles((theme) => ({
  attribution: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    width: '150px',
  }
}))

function App({ setAuthToken, setAuthLoaded }) {
  const classes = useStyles()

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

          <AuthenticatedRoute path="/favorites">
            <Favorites />
          </AuthenticatedRoute>

          <AuthenticatedRoute path="/">
            <Home />
          </AuthenticatedRoute>
        </Switch>

        <img src="/giphy-logo.gif" alt="Giphy Logo" className={classes.attribution} />
      </Container>
    </Router>
  )
}

export default connect(
  null,
  { setAuthToken, setAuthLoaded }
)(App)
