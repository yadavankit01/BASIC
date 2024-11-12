import React from "react";
import { Outlet } from "react-router-dom";

function Nested() {
  return (
    <>
      <Outlet context={["A", "B", "C", "D"]} />
      <div>Nested</div>
    </>
  );
}

export default Nested;
