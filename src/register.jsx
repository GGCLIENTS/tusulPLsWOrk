import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./register.css";
import backgroundImage from './images/BakgroundPicture.jpg';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const user = await createUserWithEmailAndPassword(auth, email.trim(), password);
      console.log("Registered:", user);
      setMessage("Амжилттай бүртгүүллээ.");
    } catch (err) {
      console.error("Error:", err.code, err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background"></div>
      <div className="particles"></div>
      <form
        onSubmit={handleRegister}
        className={`register-form ${animate ? "slideInFromBottom" : ""}`}
      >
        <h2 className="register-title">Бүртгүүлэх</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="register-input"
        />

        <button
          type="submit"
          className="register-submit-btn"
        >
          Бүртгүүлэх
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="register-back-btn"
        >
          Буцах
        </button>

        <p className="register-message">
          {message}
        </p>
      </form>
    </div>
  );
}

export default Register;
