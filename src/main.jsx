import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Outlett from "../Components/outlin.jsx";
import { store } from "./store.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlett />}>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <App />{" "}
            </Provider>
          }
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
