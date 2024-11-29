/*********************************************************************************
 * WEB422 – Assignment 5
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: __ANNA FRANCESCA DELA CRUZ_ Student ID: 123123150__ Date: NOV 15, 2024___
 *
 ********************************************************************************/
import { Container, Row, Col, Image } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <h1>Welcome to the Metropolitan Museum of Art</h1>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        alt="met museum"
      />
      <Row>
        <p>
          The Metropolitan Museum of Art, known simply as `The Met`, is the
          largest art museum in the United States. It is located in New York
          City, and its collection contains over two million works, spanning
          5,000 years of history.
        </p>
      </Row>
      <Row>
        <Col>
          <p>
            To learn more, visit the
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia entry
            </a>
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
}
