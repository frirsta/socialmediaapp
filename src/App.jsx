import "./App.css";
import NavBar from "./components/navbar/Navbar";
import { AuthContext } from "./context/Context";
import React, { useContext } from "react";
import Home from "./pages/base/Home";

function App() {
  const { user, userData } = useContext(AuthContext);
  console.log(user, userData);
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
