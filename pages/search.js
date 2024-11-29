import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { useAtom } from "jotai"; // A5
import { searchHistoryAtom } from "../store"; // A5
import { addToHistory } from "../lib/userData";

export default function AdvancedSearch() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // a5

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // make aync
  const submitForm = (data) => {
    let queryString = "searchBy=true";

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    // A5
    setSearchHistory((current) => [...current, queryString]);

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Container>
      <h1>Advanced Search</h1>
      <br />
      <br />
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="geoLocation">
          <Form.Label>Geographical Location</Form.Label>
          <Form.Control type="text" {...register("geoLocation")} />
        </Form.Group>

        <Form.Group controlId="medium">
          <Form.Label>Medium</Form.Label>
          <Form.Control type="text" {...register("medium")} />
        </Form.Group>

        <Form.Group controlId="isOnView">
          <Form.Label>Is On View?</Form.Label>
          <Form.Control type="text" {...register("isOnView")} />
        </Form.Group>

        <Form.Group controlId="isHighlight">
          <Form.Label>Is Highlight?</Form.Label>
          <Form.Control type="text" {...register("isHighlight")} />
        </Form.Group>

        <Form.Group controlId="q">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            {...register("q", { required: true })}
            className={errors.q ? "is-invalid" : ""}
          />
          {errors.q && <div className="invalid-feedback">Field required.</div>}
        </Form.Group>
        <br />
        <Button type="submit">search</Button>
      </Form>
    </Container>
  );
}

/*
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { useAtom } from "jotai"; // A5
import { searchHistoryAtom } from "../store"; // A5
import { addToHistory } from "../lib/userData"; // Importing addToHistory

export default function AdvancedSearch() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // A5

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    let queryString = "searchBy=true"; // Fixed query string for advanced search

    // Add optional parameters only if provided
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView ? data.isOnView : "false"}`; // Default to false if not provided
    queryString += `&isHighlight=${
      data.isHighlight ? data.isHighlight : "false"
    }`; // Default to false if not provided
    queryString += `&q=${data.q}`; // Add the search query as mandatory

    // A5: Add the query to search history (local state)
    setSearchHistory((current) => {
      // Avoid duplicate searches, only add if it's not already in the history
      if (!current.includes(queryString)) {
        return [...current, queryString];
      }
      return current;
    });

    // A5: Persist the search history to the server using the addToHistory function
    try {
      await addToHistory(queryString); // Save to the server (MongoDB)
    } catch (error) {
      console.error("Error saving history to the server:", error);
    }

    // Push to the artwork page with the query string
    router.push(`/artwork?${queryString}`);
  };

  return (
    <Container>
      <h1>Advanced Search</h1>
      <br />
      <br />
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="geoLocation">
          <Form.Label>Geographical Location</Form.Label>
          <Form.Control type="text" {...register("geoLocation")} />
        </Form.Group>

        <Form.Group controlId="medium">
          <Form.Label>Medium</Form.Label>
          <Form.Control type="text" {...register("medium")} />
        </Form.Group>

        <Form.Group controlId="isOnView">
          <Form.Label>Is On View?</Form.Label>
          <Form.Control type="text" {...register("isOnView")} />
        </Form.Group>

        <Form.Group controlId="isHighlight">
          <Form.Label>Is Highlight?</Form.Label>
          <Form.Control type="text" {...register("isHighlight")} />
        </Form.Group>

        <Form.Group controlId="q">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            {...register("q", { required: true })}
            className={errors.q ? "is-invalid" : ""}
          />
          {errors.q && <div className="invalid-feedback">Field required.</div>}
        </Form.Group>
        <br />
        <Button type="submit">Search</Button>
      </Form>
    </Container>
  );
}
*/
