import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router";
export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resultFetch, setResultFetch] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function creatingNewUser(e) {
    e.preventDefault();
    setErr("");
    setResultFetch(null);

    if (password.length < 8) {
      setErr("Please must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErr("passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password, email }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.messeges || `Request failed: ${response.status}`,
        );
      }
      setResultFetch(result);
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
  navigate("/login", {
  state: {
    message: "Account created successfully. Please log in.",
  },
});

    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  

 return (
  <div className="register-page">
    <div className="register-card">
      <h1 className="register-title">Create an account</h1>
      <p className="register-subtitle">
        Enter your details to get started.
      </p>

      <form className="register-form" onSubmit={creatingNewUser}>
        <div className="register-field">
          <label htmlFor="register-username">Username</label>
          <input
            id="register-username"
            type="text"
            autoComplete="username"
            placeholder="Choose a username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="register-field">
          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="register-field">
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            aria-describedby="register-password-hint"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <small id="register-password-hint">
            Use at least 8 characters.
          </small>
        </div>

        <div className="register-field">
          <label htmlFor="register-confirm">Confirm password</label>
          <input
            id="register-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {err && (
          <p className="register-error" role="alert">
            {err}
          </p>
        )}

        {resultFetch && (
          <p className="register-success" role="status">
            {resultFetch.messeges ||
              resultFetch.message ||
              "Registration successful!"}
          </p>
        )}

        <button
          className="register-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="register-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  </div>
);
}