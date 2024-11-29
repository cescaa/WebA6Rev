import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Card, Button } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, err } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  // A5
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  //const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
  };

  // A5 END

  if (err) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && (
        <Card.Img src={data.primaryImage} alt={data.title || "N/A"} />
      )}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          Medium: {data.medium || "N/A"}
          <br />
          <br />
          Artist: {data.artistDisplayName || "N/A"}
          <br />
          Credit Line: {data.creditLine || "N/A"}
          <br />
          Dimensions: {data.dimensions || "N/A"}
          <br />
          Wikidata:{" "}
          {data.artistDisplayName && (
            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
              {data.artistDisplayName || "N/A"}
            </a>
          )}
          <br />
        </Card.Text>
        {/* A5 */}
        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
