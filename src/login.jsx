import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";
import "./login.css";
import backgroundImage from './images/BakgroundPicture.jpg';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

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
    <div className="login-container">
      <div className="login-background"></div>
      <div className="particles"></div>
      <form
        onSubmit={handleLogin}
        className={`login-form ${animate ? "slideInFromBottom" : ""}`}
      >
        <h2 className="login-title">нэвтэрх</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        {error && <p className="login-error">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="login-submit-btn"
        >
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="login-back-btn"
        >
          Буцах
        </button>

        <p className="login-register-link">
          Шинэ хэрэглэгч? <a href="/register">Бүртгүүлэх</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
