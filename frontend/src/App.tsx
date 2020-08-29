import React from "react";
import "./App.css";
import { CustomAppBar } from "./components/customAppBar/CustomAppBar";
import { HomePage } from "./components/homePage/HomePage";

function App() {
  return (
    <div className="App">
      <CustomAppBar />
      <HomePage />
    </div>
  );
}

export default App;
