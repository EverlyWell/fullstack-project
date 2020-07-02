import React from 'react';
import './App.css';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function UnauthenticatedRoute({ authToken, authLoaded, children, ...rest }) {
  let body
  if(!authLoaded) {
    body = <span>Loading...</span>
  } else if(authToken) {
    body = (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    )
  } else {
    body = children
  }

  return (
    <Route {...rest}>
      {body}
    </Route>
  );
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
)(UnauthenticatedRoute)
