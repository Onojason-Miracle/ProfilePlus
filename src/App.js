import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./components/Home";
import Form from "./components/Form";
import Register from "./components/Register";
import Login from "./components/Login";
import UserData from "./components/UserData";
import ProtectedRoute from "./components/Protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="form" element={<Form />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="userdata" element={<UserData />} />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
