import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logout from "./Logout";
export default function Profile() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    async function fetchingProfile() {
      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        if (response.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Could not  load profile");
        }

        setData(result.user);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    fetchingProfile();
    return () => controller.abort();
  }, [navigate]);

  if (loading) {
    return <p>Loading your profile...</p>;
  }

  if (error) {
    return (
      <>
        <p role="alert">{error}</p>
        <Link to="/login">Go to login</Link>
      </>
    );
  }

  if (!data) {
    return <p>No user data received.</p>;
  }

  return (
    <>
      <div>
        <h1>Welcome, {data.userName}!</h1>
        <p>Email: {data.email}</p>
        <p>Age: {data.age ?? "Not provided"}</p>
        <p>Bio: {data.bio || "No bio added yet."}</p>
        <Logout />
      </div>
    </>
  );
}
