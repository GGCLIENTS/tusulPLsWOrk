import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      if (user.email.includes("teacher")) {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } catch (err) {
      console.error(err.code, err.message);

      if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Буруу password.");
      } else {
        setError("Нэвтэрэх оролдлого бүтэлгүйтлээ дахин оролдо.");
      }
    } finally {
      setLoading(false);
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
        onSubmit={handleLogin}
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
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>нэвтэрх</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", margin: "8px 0", border: "none", borderRadius: "6px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", margin: "8px 0", border: "none", borderRadius: "6px" }}
        />

        {error && (
          <p style={{ color: "#ff6b6b", textAlign: "center", fontSize: "0.9rem" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            marginTop: "10px",
            background: loading ? "#aaa" : "#4c51bf",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
        >
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
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
          Шинэ хэрэглэгч? <a href="/register" style={{ color: "#90cdf4" }}>Бүртгүүлэх</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
