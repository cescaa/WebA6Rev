import { getToken } from "./authenticate";

const apiURL = "https://user-service-api-render.onrender.com/api/user";
//process.env.NEXT_PUBLIC_API_URL

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  if (!token) return []; 

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `JWT ${token}`,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }
  return [];
}

export async function addToFavourites(id) {
  return await fetchWithAuth(`${apiURL}/favourites/${id}`, { method: "PUT" });
}

export async function removeFromFavourites(id) {
  return await fetchWithAuth(`${apiURL}/favourites/${id}`, {
    method: "DELETE",
  });
}

export async function getFavourites() {
  return await fetchWithAuth(`${apiURL}/favourites`);
}

export async function addToHistory(id) {
  return await fetchWithAuth(`${apiURL}/history/${id}`, { method: "PUT" });
}

export async function removeFromHistory(id) {
  return await fetchWithAuth(`${apiURL}/history/${id}`, { method: "DELETE" });
}

export async function getHistory() {
  return await fetchWithAuth(`${apiURL}/history`);
}
