  import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { loggedIn, register } from '../Services/AuthenticationService';

  const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    const handleFormSubmit = (e:any) => {
      e.preventDefault();
      
      if (register(username, password)) {
        history.push('/')
      } else {
        alert('Invalid username or password');
      }
    }

    const handleChange = (e:any) => {
      e.preventDefault();
      e.target.name == 'username' ? setUsername(e.target.value) : setPassword(e.target.value);
    } 

    return (
      <div>
        <p>Register</p>
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

  export default RegistrationPage;