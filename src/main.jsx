import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Outlett from "../Components/outlin.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlett />}>
        <Route path="/" element={<App />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
