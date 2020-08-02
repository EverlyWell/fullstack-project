import React from 'react';
import { withRouter, useHistory } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';
import * as Cookies from 'js-cookie';
import { RootState } from '../store/rootReducer';
import { updateToken } from '../store/auth/actions';

const Header = (props: any) => {
  const { token } = useSelector(
    (state: RootState) => state.auth
  );
  const { location } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove('userToken')
    dispatch(updateToken(''));
    history.push('/login')
  };

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Giphy Search</Navbar.Brand>
      <Nav activeKey={location.pathname} className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/favorites">Favorites</Nav.Link>
      </Nav>
      { token && <Nav.Link onClick={logout}>Log Out</Nav.Link> }
    </Navbar>
  );
};
export default withRouter(Header);