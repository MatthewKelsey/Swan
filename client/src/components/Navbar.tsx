import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api";
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
        <h4>Home</h4>
      </div>
      <h1>Swan Odds </h1>
      <div className="nav-menu" onClick={exit}>
        <h4>Logout</h4>
      </div>
    </div>
  );
}

export default Navbar;
