import React, { useState } from "react";
import "./App.css";
import { CustomAppBar } from "./components/customAppBar/CustomAppBar";
import { HomePage } from "./components/homePage/HomePage";
import { isLoggedIn, logIn } from "./userManagement";
import { LoginDialog } from "./components/loginDialog/LoginDialog";

function App() {
  const [loggedIn, setIsLoggedIn] = useState(isLoggedIn());

  const handleLogin = (id: string) => {
    logIn(id);
    setIsLoggedIn(isLoggedIn());
  };
  return (
    <div className="App">
      <CustomAppBar />
      <HomePage />
      <LoginDialog open={!loggedIn} handleLogin={handleLogin} />
    </div>
  );
}

export default App;
