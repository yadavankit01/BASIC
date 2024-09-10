import React, { useContext } from "react";
import { Calculatorcontaxt } from "../context/Calculatorcontext";

function Display() {
  const { calval } = useContext(Calculatorcontaxt);
  return (
    <>
      <input
        type="text"
        readOnly
        value={calval}
        className="inputs"
        placeholder="0"
      />
    </>
  );
}

export default Display;
