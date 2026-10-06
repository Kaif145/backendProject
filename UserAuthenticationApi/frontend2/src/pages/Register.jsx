import { useState } from "react";
import { Link } from "react-router";
export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resultFetch,setResultFetch] = useState("");
  const [err,setErr] = useState("");
  const [loading, setLoading] = useState(false);


  async function creatingNewUser(e) {
     e.preventDefault();
    setErr("");
    setResultFetch(null);

    if(password.length < 8){
      setErr("Please must contain at least 8 characters.");
      return;
    }
    if(password !== confirmPassword){
      setErr("passwords do not match.");
      return;
    }
setLoading(true);
    try{
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
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

   return (
    <>
      <h1>Create an account</h1>

      <form onSubmit={creatingNewUser}>
        <input
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      {err && <p role="alert">{err}</p>}

      {resultFetch && (
        <p>
          {resultFetch.messeges ||
            resultFetch.message ||
            "Registration successful!"}
        </p>
      )}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );

}
