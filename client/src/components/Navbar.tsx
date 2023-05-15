import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api";
import homeImg from '../icons/home.png'
import logoutImg from '../icons/logout.png'

function Navbar() {
  const navigate = useNavigate();

  function returnHome() {
    navigate("/home");
  }

  function exit() {
    logout();
    navigate("/login");
  }

  return (
    <div className="nav-bar">
      <div className="nav-menu" onClick={returnHome}>
        <img src={homeImg} alt="Home" className="nav-icon" />
      </div>
      <h1>The Gee-Gees </h1>
      <div className="nav-menu" onClick={exit}>
        <img src={logoutImg} alt="Logout" className="nav-icon" />
      </div>
    </div>
  );
}

export default Navbar;
