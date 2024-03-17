import "./App.css";
import NavBar from "./components/navbar/Navbar";
import { AuthContext } from "./context/Context";
import React, { useContext } from "react";

function App() {
  const { user, userData } = useContext(AuthContext);
  console.log(user, userData);
  return <div>app</div>;
}

export default App;
