import React, {useEffect, useState} from 'react';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
   const token = window.localStorage.getItem('token')
   if(token) {
    setIsLoggedIn(true)
   }
  });

  // SPA WITH STATE. NO NEED React Router
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
