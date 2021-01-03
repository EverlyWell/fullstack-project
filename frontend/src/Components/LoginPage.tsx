  import React, { useState } from 'react';
  import { Redirect, useHistory } from 'react-router-dom';
  import { getToken, loggedIn, login } from '../Services/AuthenticationService'

  const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    const handleFormSubmit = (e:any) => {
      e.preventDefault();
      
      const result = login(username, password);
      result.then((response) => {
        if (response === true) {
          history.push('/')
        } else {
          alert('Invalid username or password');
        }
      })
    }

    const handleChange = (e:any) => {
      e.preventDefault();
      e.target.name == 'username' ? setUsername(e.target.value) : setPassword(e.target.value);
    } 

    return (
      <div>
        <p>Login</p>
        <form onSubmit={handleFormSubmit}>
            <div>Username: </div>
            <input
                name="username"
                type="text"
                onChange={handleChange}
            />
            <div>Password: </div>
            <input
                name="password"
                type="password"
                onChange={handleChange}
            />
            <br />
            <input
                className="form-submit"
                value="Submit"
                type="submit"
            />
        </form>
      </div>
    )
  }

  export default LoginPage;