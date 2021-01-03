  import axios from 'axios';

  const loginUrl = 'api/v1/login';
  const registerUrl = 'api/v1/register';

  export const storeToken = (token: string) => {
    sessionStorage.setItem('token', token);
  }

  export const login = async (username: any, password: any) => {
    const result = await axios.post(loginUrl, { user: {
      username: username,
      password: password
    }});
    if (result.data.token) {
      storeToken(result.data.token);
      return true;
    } else {
      return false;
    }
  }

  export const register = async (username: any, password: any) => {
    const result = await axios.post(registerUrl, { user: {
        username: username,
        password: password
    }});
    if (result.data.token) {
      storeToken(result.data.token);
      return true;
    } else {
      return false;
    }
  }

  export const getToken = () => {
    return sessionStorage.getItem('token');
  }
  
  export const loggedIn = () => {
    const token = getToken();
    return !!token;
  }
