import React, { useState } from 'react';
import LoginForm  from './components/LoginForm/LoginForm';

interface Credentials {
  token: string,
  cat_api_sub_id: string,
  username: string,
}

const App = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  
  return (
    <div>
      {credentials === null ? <LoginForm setCredentials={setCredentials} /> : <div>{`logged in as: ${credentials.username}`}</div>}
    </div>
  );
}

export default App;
