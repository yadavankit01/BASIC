import React, { useContext } from "react";
import { Calculatorcontaxt } from "../context/Calculatorcontext";

function Buttons() {
  const { calc, buttonval, buttonNames } = useContext(Calculatorcontaxt);
  const getButtonClass = (value) => {
    if (value === "=") {
      return "equals";
    } else if (["+", "-", "*", "/", "AC", "DEL", "%"].includes(value)) {
      return "operator";
    } else {
      return "number";
    }
  };
  return (
    <>
      <div className="btn-container">
        {buttonval.map((Buttons) => {
          return (
            <button
              key={Buttons}
              onClick={() => calc(Buttons)}
              className={`btn ${getButtonClass(Buttons)}`}
            >
              {Buttons}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Buttons;
