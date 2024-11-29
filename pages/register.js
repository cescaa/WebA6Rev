import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/lib/authenticate";

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== password2) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    const isRegistered = await registerUser(user, password, password2);

    if (isRegistered) {
      router.push("/login"); // Redirect to login page
    } else {
      setError("Failed to register. Please try again.");
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert">{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
