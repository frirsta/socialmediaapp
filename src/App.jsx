import "./App.css";
import NavBar from "./components/navbar/Navbar";
import { AuthContext } from "./context/Context";
import React, { useContext } from "react";

function App() {
  const { user, userData } = useContext(AuthContext);
  console.log(user, userData);
  return <div>{user && userData && <NavBar />}</div>;
}

export default App;
