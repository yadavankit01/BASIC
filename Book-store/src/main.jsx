import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BookContextProvider from "./context/Bookcontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookContextProvider>
      <App />
    </BookContextProvider>
  </StrictMode>
);
