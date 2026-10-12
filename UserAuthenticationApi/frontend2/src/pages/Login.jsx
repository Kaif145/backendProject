import { useState } from "react";
import "./Login.css";
import { Link, useNavigate, useLocation } from "react-router";
export default function Login() {
  const [data, setData] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  async function fetchingData(e) {
    e.preventDefault();
    setData("");
    setErr("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.messeges || `Request failed: ${response.status}`,
        );
      }

      setData(result);
      setPassword("");
      navigate("/profile");
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Log in to your account</p>
          {successMessage && <p role="status">{successMessage}</p>}
          <form className="login-form" onSubmit={fetchingData}>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              placeholder="Enter your Email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter YOur password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "login"}
            </button>
          </form>

          {err && (
            <p className="login-error" role="alert">
              {err}
            </p>
          )}

          <p className="login-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
