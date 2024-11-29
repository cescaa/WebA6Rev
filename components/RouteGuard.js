/*
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai"; // A5
import { favouritesAtom, searchHistoryAtom } from "../store"; // A5
import { getFavourites, getHistory } from "../lib/userData"; // Import functions to fetch user data

const PUBLIC_PATHS = ["/login", "/register"]; // Paths that don't need login

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom); // A5
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // A5

  const [isClient, setIsClient] = useState(false); // Track if client-side rendering

  // UseEffect hook to set the `isClient` flag once mounted on the client
  useEffect(() => {
    setIsClient(true); // This ensures that localStorage is only accessed on the client
  }, []);

  // Function to update atoms with user's favourites and history
  const updateAtoms = async () => {
    if (isClient) {
      const token = localStorage.getItem("token"); // Access localStorage only on the client-side

      if (token) {
        try {
          const favouritesData = await getFavourites();
          const historyData = await getHistory();

          setFavourites(favouritesData); // Update the favourites atom
          setSearchHistory(historyData); // Update the search history atom
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    }
  };

  useEffect(() => {
    // Ensure that we update atoms on mount if logged in
    if (!PUBLIC_PATHS.includes(router.pathname) && isClient) {
      const token = localStorage.getItem("token"); // Ensure localStorage is available
      if (!token) {
        // Redirect to login page if not logged in
        router.push("/login");
      } else {
        // Update atoms with the user's data if logged in
        updateAtoms();
      }
    }
  }, [router.pathname, isClient]);

  // Render children if the user is logged in and not on a public path
  if (
    isClient &&
    (localStorage.getItem("token") || PUBLIC_PATHS.includes(router.pathname))
  ) {
    return <>{children}</>;
  }

  return null; // Loading state or fallback UI could be rendered here
};

export default RouteGuard;
*/
/*
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData"; // Import functions to fetch user data

const PUBLIC_PATHS = ["/login", "/register"]; // Paths that don't need login

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom); // A5
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // A5
  const [isClient, setIsClient] = useState(false); // Track if client-side rendering

  // UseEffect hook to set the `isClient` flag once mounted on the client
  useEffect(() => {
    setIsClient(true); // This ensures that localStorage is only accessed on the client
  }, []);

  // Function to update atoms with user's favourites and history
  const updateAtoms = async () => {
    if (isClient) {
      const token = localStorage.getItem("token"); // Access localStorage only on the client-side

      if (token) {
        try {
          const favouritesData = await getFavourites();
          const historyData = await getHistory();

          setFavourites(favouritesData); // Update the favourites atom
          setSearchHistory(historyData); // Update the search history atom
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    }
  };

  useEffect(() => {
    // Check if the current path is not a public path
    if (!PUBLIC_PATHS.includes(router.pathname)) {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect to login page if no token is found
        router.push("/login");
      } else {
        // Update atoms with the user's data if logged in
        updateAtoms();
      }
    }
  }, [router.pathname, isClient]);

  // Render children if the user is logged in or the path is public
  if (
    isClient &&
    (localStorage.getItem("token") || PUBLIC_PATHS.includes(router.pathname))
  ) {
    return <>{children}</>;
  }

  return null; // Loading state or fallback UI could be rendered here
};

export default RouteGuard;

*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "../store"; // Importing atoms to store data
import { getFavourites, getHistory } from "../lib/userData"; // Importing functions to fetch user data

const PUBLIC_PATHS = ["/login", "/register"]; // Paths that don't need login

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom); // Using atom for favourites
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Using atom for search history
  const [isClient, setIsClient] = useState(false); // Track if client-side rendering

  // Set the `isClient` flag once mounted on the client
  useEffect(() => {
    setIsClient(true); // This ensures that localStorage is only accessed on the client
  }, []);

  // Function to update atoms with user's favourites and history
  const updateAtoms = async () => {
    if (isClient) {
      const token = localStorage.getItem("token"); // Access localStorage only on the client-side

      if (token) {
        try {
          const favouritesData = await getFavourites(); // Fetch favourites data from API
          const historyData = await getHistory(); // Fetch history data from API

          setFavourites(favouritesData); // Update the favourites atom
          setSearchHistory(historyData); // Update the search history atom
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    }
  };

  useEffect(() => {
    // If the route is protected (not public), check for authentication
    if (!PUBLIC_PATHS.includes(router.pathname)) {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect to login page if no token is found
        router.push("/login");
      } else {
        // Update atoms with the user's data if logged in
        updateAtoms();
      }
    }
  }, [router.pathname, isClient]); // Run this when the path changes or when mounted

  // Render children if the user is logged in or if the path is public
  if (
    isClient &&
    (localStorage.getItem("token") || PUBLIC_PATHS.includes(router.pathname))
  ) {
    return <>{children}</>; // Return the protected children if user is logged in or the page is public
  }

  return null; // Return nothing while loading, or you can return a loading spinner if needed
};

export default RouteGuard;
