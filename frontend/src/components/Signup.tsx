import React, {useState, useEffect} from 'react';
import {Button, Form} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

function Signup() {
  const history = useHistory();
  const [formType, setFormType] = useState('Signup')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if(token) {
      history.push('/search')
    }
  },[])

  const login = async (type: string) =>  {
    let url = ''
    if(type === 'Login') {
      url = '/api/users/login'
    } else {
      url = '/api/users'
    }

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password}) // body data type must match "Content-Type" header
    });

    const body = await response.json()
    console.log(body)
    if(body.token) {
      window.localStorage.setItem('token', body.token)
      history.push('/search')
    }
  }

  const getOppositeType = (type: string): string => {
    let returnValue = '';
    if(type === 'Login') {
      returnValue = 'Signup';
    }
    if(type === 'Signup') {
      returnValue = 'Login'
    }
    return returnValue;
  }

  const setInputValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if(ev.target.name === 'password') {
      setPassword(ev.target.value)
    } else {
      setUsername(ev.target.value)
    }
  }

  return (
    <div className="signup">
        <h1>{formType}</h1>
         <Form>
           <Form.Field>
           <label>Username</label>
           <input placeholder='username' name="username" type="text" required onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setInputValue(ev)}/>
          </Form.Field>
          <Form.Field>
           <label>Password</label>
           <input type="password" placeholder="password" name="password" required onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setInputValue(ev)} />
           </Form.Field>
           <div className="login-or-signup">
            <Button type='submit' onClick={() => login('login')}>{formType}</Button>
           </div>
         </Form>
        <a onClick={() => setFormType(getOppositeType(formType))}>{getOppositeType(formType)} Instead</a>
    </div>
  );
}

export default Signup;
