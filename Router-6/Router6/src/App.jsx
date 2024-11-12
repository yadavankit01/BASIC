import { useState } from "react";
import "./App.css";
import Header from "./Pages/Header/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import List from "./Pages/List/List";
import Details from "./Pages/Details/Details";
import Outside from "./Pages/Outside/Outside";
// import Nested from "./Pages/Nested/Nested";
// import NRC from "./Pages/NestedComponent/NRC";

function App() {
  return (
    <>
      <Router history={history}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />

          <Route path="/List" element={<List />} />
          <Route path="Details/:movieId" element={<Details />} />

          <Route path="/Outside" element={<Outside />} />
          {/* <Route path="/Nested" element={<Nested />}>
            <Route path="NRC" element={<NRC />} />
          </Route> */}
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route />
        </Routes>
      </Router>
    </>
  );
}

export default App;
