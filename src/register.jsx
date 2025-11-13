import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const user = await createUserWithEmailAndPassword(auth, email.trim(), password);
      console.log("Registered:", user);
      setMessage("Success! You can now log in.");
    } catch (err) {
      console.error("Error:", err.code, err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "2rem",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Бүртгүүлэх</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", margin: "8px 0", border: "none", borderRadius: "6px" }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", margin: "8px 0", border: "none", borderRadius: "6px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            marginTop: "10px",
            background: "#4c51bf",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Бүртгүүлэх
        </button>

        {/* Return to Home button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#90cdf4",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Буцах
        </button>

        <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.85rem" }}>
          {message}
        </p>
      </form>
    </div>
  );
}

export default Register;
