import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import Container from 'react-bootstrap/Container';
import HeaderWithRouter from '../components/Header';

const AuthenticatedRoute = ({ ...rest }) => {
  const { token } = useSelector(
    (state: RootState) => state.auth
  );

  if (!token) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  }

  return (
    <>
      <HeaderWithRouter />
      <Container>
        <Route {...rest} />
      </Container>
    </>
  )
};

export default AuthenticatedRoute;