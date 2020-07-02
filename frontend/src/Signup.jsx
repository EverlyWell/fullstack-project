import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

function Signup() {
  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>

      <form className="login-form" noValidate>
        <TextField
          required
          fullWidth
          autoFocus
          label="Email Address"
          name="email"
        />

        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit-button"
        >
          Sign Up
        </Button>

        <Link href="/login" variant="body2">
          {"Log In"}
        </Link>
      </form>
    </Container>
  )
}

export default Signup
