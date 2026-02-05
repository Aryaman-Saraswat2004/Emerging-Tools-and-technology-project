import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered! Please login.");
      navigate("/");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div>
     <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <input placeholder="City" onChange={(e) => setForm({ ...form, city: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
