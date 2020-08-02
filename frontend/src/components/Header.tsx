import React from 'react';
import { withRouter } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = (props: any) => {
  const { location } = props;
  return (
    <Navbar bg="light" variant="light">
      <Nav activeKey={location.pathname}>
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/favorites">Favorites</Nav.Link>
      </Nav>
    </Navbar>
  );
};
export default withRouter(Header);