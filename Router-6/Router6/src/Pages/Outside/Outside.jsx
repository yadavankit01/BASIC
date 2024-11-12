import React from "react";

function Outside() {
  const Handal = () => {
    console.log("Redirect ");
    history.go(-1);
  };
  return (
    <>
      <div>Outside</div>
      <button onClick={Handal}>Click</button>
    </>
  );
}

export default Outside;
