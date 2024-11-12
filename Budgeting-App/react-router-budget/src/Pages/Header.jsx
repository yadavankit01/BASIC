import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: "5px", backgroundColor: "#f0f0f0" }}>
      <nav style={{ padding: "5px" }}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </header>
  );
}

export default Header;
