import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ViewResult from "./pages/ViewResult";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  console.log("App rendered");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view" element={
          <ProtectedRoute><ViewResult /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

