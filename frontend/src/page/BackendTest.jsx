import { useEffect, useState } from "react";
import API from "../services/api";

function BackendTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Backend not connected"));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Backend Connection Test</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default BackendTest;