import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    const token = sessionStorage.getItem('token')
    let link;
  
    if (token) {
      link =  <Link to="/favorites">Favorites </Link>
    } else {
      link = [<Link to="/signup">Signup </Link>, <Link to="/login">Login </Link>]
    }
    return (
      <div>
        <Link to="/">Home </Link>
        {link}
      </div>
    );
  }

export default Navbar;