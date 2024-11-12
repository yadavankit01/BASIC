import { Outlet } from "react-router-dom";
import wave from "../../assets/wave.svg";
import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Context";
function Main() {
  const { userName } = useContext(UserContext);

  return (
    <div className="layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
}

export default Main;
