import React from 'react'

import { useState } from "react";
import axios from "../api";

function ViewResult() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);

  const fetchResult = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data);
    } catch {
      alert("Result not found or unauthorized.");
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-10">
      <input className="border p-2 w-full mb-2" placeholder="Enter Scholar ID" onChange={(e) => setId(e.target.value)} />
      <button className="bg-green-500 text-white p-2" onClick={fetchResult}>Get Result</button>
      {result && <pre className="mt-4 bg-gray-100 p-4">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default ViewResult;

