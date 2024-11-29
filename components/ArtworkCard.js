import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ArtworkCard({ objectID }) {
  const { data, err } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (err) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      <Card.Img
        src={
          data.primaryImageSmall
            ? data.primaryImageSmall
            : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
        alt={data.title || "N/A"}
      />
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>date:</strong> {data.objectDate || "N/A"} <br />
          <strong>classification:</strong> {data.classification || "N/A"} <br />
          <strong>medium:</strong> {data.medium || "N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
          <Button variant="primary">See #{objectID} details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
