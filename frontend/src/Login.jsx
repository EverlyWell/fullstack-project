import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { setAuthToken } from './actions/index'
import { userLogin } from './services/user'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

function Login({ setAuthToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  let history = useHistory()

  function updateEmail(event) {
    setEmail(event.target.value)
  }

  function updatePassword(event) {
    setPassword(event.target.value)
  }

  function login(event) {
    event.preventDefault()
    setSubmitting(true)
    userLogin(email, password)
    .then(({ data }) => {
      let authToken = data.auth
      Cookies.set('userToken', authToken)
      setAuthToken(authToken)
      history.push('/')
    })
    .catch((e) => {
      console.error(e)
    })
    .finally(() => {
      setSubmitting(false)
    })
  }

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        Log In
      </Typography>

      <form className="login-form" noValidate onSubmit={login}>
        <TextField
          required
          fullWidth
          autoFocus
          label="Email Address"
          name="email"
          value={email}
          onChange={updateEmail}
        />

        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={updatePassword}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit-button"
          disabled={submitting}
        >
          Log In
        </Button>

        <Link href="/login" variant="body2">
          {"Log In"}
        </Link>
      </form>
    </Container>
  )
}

export default connect(
  null,
  { setAuthToken }
)(Login)
