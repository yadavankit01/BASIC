//

// this is way two

// way three

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Procted({ children }) {
  const islogin = true;
  if (!islogin) {
    console.log("Procted");
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
      {children}
    </>
  );
}

export default Procted;
