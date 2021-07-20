import React, { useState } from "react";
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const token = sessionStorage.getItem('token')
  
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        axios.post("http://localhost:3010/api/users/login", {user: {username: username, password: password}})
          .then(res => sessionStorage.setItem('token', JSON.stringify(res.data.token)))
          .catch(error => console.log(error))
    };
    console.log(token);
       // if (token) {
    //   return <Redirect to='/' />
    //  }
  
 
  return (
    <div className="login-wrapper">
    <h1>Please Log In</h1>
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>

      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
  );
}

export default Login;