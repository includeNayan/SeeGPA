import React from 'react'
import { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  console.log("Login rendered");

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const login = async () => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/view");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-1/3 mx-auto mt-20">
      <input className="border p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2" onClick={login}>Login</button>
    </div>
  );
}

export default Login;
