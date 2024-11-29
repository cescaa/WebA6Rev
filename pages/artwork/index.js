/*********************************************************************************
 * WEB422 – Assignment 4
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: __ANNA FRANCESCA DELA CRUZ_ Student ID: 123123150__ Date: NOV 1, 2024___
 *
 ********************************************************************************/
import validObjectIDList from "@/public/data/validObjectIDList.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "../../components/ArtworkCard";

// http://localhost:3000/artwork?q=landscape&hasImages=true
const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data && data.objectIDs) {
      const filteredResults = data.objectIDs.filter((id) =>
        validObjectIDList.objectIDs.includes(id)
      );

      // Check if filteredResults is a valid array
      if (Array.isArray(filteredResults)) {
        const results = [];
        for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
          results.push(filteredResults.slice(i, i + PER_PAGE));
        }
        setArtworkList(results);
        setPage(1);
      }
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const nextPage = () => {
    if (page < artworkList.length) setPage((prev) => prev + 1);
  };

  if (error) return <Error statusCode={404} />;

  if (!artworkList || artworkList.length === 0) {
    return (
      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>
          <p>Try searching for something else.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Row className="gy-4">
        {artworkList[page - 1].map((currentObjectID) => (
          <Col lg={3} key={currentObjectID}>
            <ArtworkCard objectID={currentObjectID} />
          </Col>
        ))}
      </Row>

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
