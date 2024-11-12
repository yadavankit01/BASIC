import React from "react";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const nevigate = useNavigate();
  const handalBack = () => {
    console.log("Redirect ");
    nevigate(-1);
  };
  const handalForword = () => {
    nevigate(1);
  };

  return (
    <>
      <ul>
        <li>
          {" "}
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/About"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/List"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Product-List
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to={"/Details"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Product-Details
          </NavLink>
        </li> */}
        <li>
          {" "}
          <NavLink
            to={"/Outside"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Outside
          </NavLink>
        </li>
        {/* <li>
          {" "}
          <NavLink
            to={"/Nested"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Nested-Routes
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            to={"/Nested/NRC"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            NRC
          </NavLink>
        </li> */}
      </ul>
      <div className="btn-bf">
        <button onClick={handalBack}>Back</button>

        <button onClick={handalForword}>Forword</button>
      </div>
    </>
  );
}

export default Header;
