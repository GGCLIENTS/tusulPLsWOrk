import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Home from "./home";

function TeacherPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f6d365, #fda085)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "20px",
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        Welcome, Teacher!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px", color: "#f0f0f0" }}>
        Амжилттай нэвтэрлээ!.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "12px 25px",
          fontSize: "1rem",
          fontWeight: "600",
          color: "#fff",
          background: "#4c51bf",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
        onMouseLeave={(e) => (e.target.style.opacity = 1)}
      >
        Буцах
      </button>
    </div>
  );
}

function StudentPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "20px",
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        Welcome, Student!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px", color: "#f0f0f0" }}>
        Амжилттай нэвтэрлээ
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "12px 25px",
          fontSize: "1rem",
          fontWeight: "600",
          color: "#fff",
          background: "#4c51bf",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
        onMouseLeave={(e) => (e.target.style.opacity = 1)}
      >
        Буцах
      </button>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/teacher" element={<TeacherPage />} />
      <Route path="/student" element={<StudentPage />} />
    </Routes>
  );
}

export default App;
