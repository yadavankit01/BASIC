import { createContext, useState } from "react";

export const Calculatorcontaxt = createContext();

const Calculatorcontaxtprovider = ({ children }) => {
  const buttonval = [
    "AC",
    "DEL",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "00",
    "0",
    ".",
    "=",
  ];

  const [calval, setcalval] = useState("");
  const calc = (buttonNames) => {
    if (buttonNames === "AC") {
      setcalval("");
    } else if (buttonNames === "=") {
      const result = eval(calval);
      setcalval(result);
    } else if (buttonNames === "DEL") {
      setcalval(calval.slice(0, -1));
    } else if (buttonNames === "%") {
      try {
        const percentage = eval(calval) / 100;
        setcalval(percentage.toString());
      } catch (error) {
        setcalval("Error");
      }
    } else {
      const newval = calval + buttonNames;
      setcalval(newval);
    }
  };
  return (
    <>
      <Calculatorcontaxt.Provider value={{ calc, calval, buttonval }}>
        {" "}
        {children}
      </Calculatorcontaxt.Provider>
    </>
  );
};
export default Calculatorcontaxtprovider;
