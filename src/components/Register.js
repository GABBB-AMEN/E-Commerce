import React, { useState } from "react";
import "./Login.css";

export default function Register({ setIsRegister }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registered successfully!");
  };

  return (
    <>
      {/* LEFT SIDE (Register form, orange background) */}
      <div className="login-left">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-box">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button className="login-btn" type="submit">
            REGISTER
          </button>
        </form>
      </div>

      {/* RIGHT SIDE (Welcome panel) */}
      <div className="login-right">
        <h1>Hello, Welcome</h1>
        <p>Already have an account?</p>
        <button className="register-btn" onClick={() => setIsRegister(false)}>
          Login
        </button>
      </div>
    </>
  );
}