import { Link } from "react-router";

export default function About() {
  return (
    <>
      <h1>About pages</h1>
      <p>
        Login again <Link to="/login">Login</Link>
      </p>
    </>
  );
}
