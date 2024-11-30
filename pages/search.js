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

