import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { setAuthToken } from './actions/index'
import { registerUser, userLogin } from './services/user'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
  },

  button: {
    margin: theme.spacing(4, 0),
  },
}))

function Login({ screen, setAuthToken }) {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const isLogin = screen === 'login'

  let history = useHistory()

  function updateEmail(event) {
    setEmail(event.target.value)
  }

  function updatePassword(event) {
    setPassword(event.target.value)
  }

  function login(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    const apiCall = isLogin ? userLogin : registerUser

    apiCall(email, password)
    .then(({ data }) => {
      let authToken = data.auth
      Cookies.set('userToken', authToken)
      setAuthToken(authToken)
      history.push('/')
    })
    .catch(({ response }) => {
      let errorMsg = 'Something went wrong. Try again later'
      if(response && response.data && response.data.error) {
        errorMsg = response.data.error
      }
      setError(errorMsg)
      setSubmitting(false)
    })
  }

  return (
    <Container maxWidth="xs" data-testid="login-page">
      <Typography component="h1" variant="h5" className={classes.title}>
        {isLogin ? 'Log In' : 'Sign Up'}
      </Typography>

      {errorMessage && errorMessage.length &&
        <Alert severity="error">{errorMessage}</Alert>
      }

      <form onSubmit={login}>
        <TextField
          required
          fullWidth
          autoFocus
          margin="normal"
          label="Email Address"
          name="email"
          value={email}
          onChange={updateEmail}
          inputProps={{
            'data-testid': 'email-input'
          }}
        />

        <TextField
          required
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={updatePassword}
          inputProps={{
            'data-testid': 'password-input'
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={submitting}
          className={classes.button}
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>

        <Grid container direction="row" justify="center">
          <Link
            href={isLogin ? '/signup' : '/login'}
            variant='body1'
          >
            {isLogin ? 'Don\'t have an account? Sign up.' : 'Already registered? Log in.'}
          </Link>
        </Grid>
      </form>
    </Container>
  )
}

export default connect(
  null,
  { setAuthToken }
)(Login)
