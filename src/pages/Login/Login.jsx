import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { authServices } from "../../apiServices/authServices.js";
import SubLoader from "../../components/SubLoader/SubLoader.jsx";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoggingIn(true);
      const res = await authServices.login({ email, password });
      localStorage.setItem("token", res.token);
      onLogin?.(); // update App state
      navigate("/home");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="app auth-card">
      <h1>Welcome Back 👋</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button disabled={isLoggingIn} type="submit" className="auth-btn">
          {isLoggingIn ? (
            <div className="auth-btn-loader">
              <p>Logging in...</p>
              <SubLoader />
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="auth-switch">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
}
