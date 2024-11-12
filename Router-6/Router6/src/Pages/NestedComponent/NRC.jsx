import React from "react";
import { useOutletContext } from "react-router-dom";
function NRC() {
  const Data = useOutletContext();
  return (
    <>
      <div>NRC</div>
      {Data.map((item, index) => (
        <h1 key={index + 1}>{item}</h1>
      ))}
    </>
  );
}

export default NRC;
