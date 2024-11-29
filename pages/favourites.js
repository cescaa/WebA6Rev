import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Card, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { getFavourites } from "@/lib/userData";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    async function fetchFavourites() {
      setFavouritesList(await getFavourites());
    }
    fetchFavourites();
  }, [setFavouritesList]);

  if (!favouritesList) return null;

  return (
    <div>
      <h1>Favourites</h1>

      {favouritesList.length === 0 ? (
        <p>Nothing Here. Try adding some new artwork to the list.</p>
      ) : (
        <Row>
          {favouritesList.map((objectID) => (
            <Col key={objectID} md={4}>
              <Link href={`/artwork/${objectID}`}>
                <Card>
                  <Card.Body>
                    <Card.Title>Artwork {objectID}</Card.Title>
                    <Card.Text>Details about artwork...</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
