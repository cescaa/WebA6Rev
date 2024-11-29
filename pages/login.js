import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites, getHistory } from "@/lib/userData";
import { favouritesAtom, searchHistoryAtom } from "@/store";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const isAuthenticated = await authenticateUser(user, password);

    if (isAuthenticated) {
      // Update atoms with data from the backend
      async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
      }
      await updateAtoms();

      router.push("/favourites"); // Redirect to favourites page
    } else {
      setError("Invalid username or password. Please try again.");
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
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
        {error && <div className="alert">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
