import React, { useState } from 'react';
import LoginForm  from './components/LoginForm/LoginForm';
import CatBoard from './components/CatBoard/CatBoard';

interface Credentials {
  token: string,
  cat_api_sub_id: string,
  username: string,
}

const App = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  
  return (
    <div>
      {credentials === null ? <LoginForm setCredentials={setCredentials} /> : <CatBoard sub_id={credentials.cat_api_sub_id} />}
    </div>
  );
}

export default App;
