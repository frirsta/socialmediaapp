import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Context from "./context/Context.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Reset from "./pages/Auth/Reset.jsx";
import Profile from "./pages/profiles/Profile.jsx";
import NavBar from "./components/navbar/Navbar.jsx";
import Explore from "./pages/base/Explore.jsx";
import NotFound from "./pages/base/NotFound.jsx";
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
