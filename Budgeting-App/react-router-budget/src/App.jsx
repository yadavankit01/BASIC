import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Deshbord from "./Pages/Deshbord";
import Main from "./Pages/Layout/Main";
import ViewAll from "./Pages/ViewAll";
import ViewList from "./Pages/ViewList";
function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any cleanup or logout logic here (e.g., clearing localStorage)
    localStorage.removeItem("userName");

    // Redirect to the home or login page after logout
    navigate("/");
  }, [navigate]);

  return <h1>Logging out...</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Deshbord />} />
        <Route path="AllExpense" element={<ViewAll />} />
        <Route path="viewlist/:id" element={<ViewList />} />
      </Route>
      <Route path="*" element={<h1>Error: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
