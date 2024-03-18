import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Context from "./context/Context.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Reset from "./pages/Auth/Reset.jsx";
import Profile from "./pages/profiles/Profile.jsx";
import NavBar from "./components/navbar/Navbar.jsx";
import Explore from "./pages/base/Explore.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <NavBar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
