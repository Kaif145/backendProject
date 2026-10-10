import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";

export default function Profile() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchingProfile(req, res) {
      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });
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
  }, []);

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
      </div>
    </>
  );
}
