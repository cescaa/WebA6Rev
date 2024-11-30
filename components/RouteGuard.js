
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";

const PUBLIC_PATHS = ["/login", "/register"]; 

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom); 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const updateAtoms = async () => {
    if (isClient) {
      const token = localStorage.getItem("token"); 

      if (token) {
        try {
          const favouritesData = await getFavourites(); 
          const historyData = await getHistory();

          setFavourites(favouritesData); 
          setSearchHistory(historyData); 
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    }
  };

  useEffect(() => {
    if (!PUBLIC_PATHS.includes(router.pathname)) {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
      } else {
        updateAtoms();
      }
    }
  }, [router.pathname, isClient]); 
  if (
    isClient &&
    (localStorage.getItem("token") || PUBLIC_PATHS.includes(router.pathname))
  ) {
    return <>{children}</>; // Return the protected children if user is logged in or the page is public
  }

  return null; 

export default RouteGuard;
