import React, { useState } from "react";
import "./login.css";
import img from "../../assets/logoimg.jpeg";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "naman@gmail.com" && password === "123") {
      setError("");
      onLogin(); // ✅ Redirect handled in App.tsx
    } else {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={img} alt="avatar" className="avatar" />
          <h2>Sign in</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <div className="forgot-password">
          <span role="img" aria-label="lock">🔒</span> Forgot your password?
        </div>
      </div>
    </div>
  );
};

export default Login;
