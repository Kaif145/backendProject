import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Profile from "./pages/Profile";

export default function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
    </>
  );
}
