import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logomark.svg";
import {
  TrashIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../Context/Context";

function Navbar() {
  const { userName, logout, userData, DeleteUser } = useContext(UserContext);
  console.log("userName value:", userName);
  return (
    <nav>
      <NavLink to="/" aria-label="Go to Home">
        <img src={logo} alt="" height={"30px"} />
        <span>HomeBudget</span>
      </NavLink>
      <div style={{ display: "flex", gap: "10px" }}>
        {userName && userName.trim() !== "" ? (
          <form onSubmit={logout}>
            <button type="submit" className="btn custom-btn logout-btn">
              <ArrowRightOnRectangleIcon width={20} /> Log-out
            </button>
          </form>
        ) : null}
        {userData && userName.trim() !== "" ? (
          <form>
            <button
              type="submit"
              className="btn custom-btn delete-btn"
              onClick={DeleteUser}
            >
              <TrashIcon width={20} /> Delete User
            </button>
          </form>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
