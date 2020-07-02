import React from 'react'
import './App.css'
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'

function AuthenticatedRoute({ authToken, authLoaded, children, ...rest }) {
  let body
  if(!authLoaded) {
    body = <span>Loading...</span>
  } else if(authToken) {
    body = children
  } else {
    body = (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    )
  }

  return (
    <Route {...rest}>
      {body}
    </Route>
  )
}

const mapStateToProps = ({ authToken, authLoaded }) => {
  return {
    authToken,
    authLoaded
  }
}

export default connect(
  mapStateToProps,
  null
)(AuthenticatedRoute)
