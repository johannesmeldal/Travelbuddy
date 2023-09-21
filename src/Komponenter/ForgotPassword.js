import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function GlemtPassord() {
  const epostRef = useRef();
  const { nullstillPassord } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmitt(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await nullstillPassord(epostRef.current.value);
      setMessage("Sjekk mailen din for mer informasjon");
    } catch {
      setError(" Klarte ikke å nullstille passordet");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 classname="text-center mb-4"> Nullstill passord</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmitt}>
            <Form.Group id="epost">
              <Form.Label> Epost</Form.Label>
              <Form.Control type="epost" ref={epostRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Nullstill passord
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <a href="/login">Logg inn </a>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Har du ikke en bruker? <a href="/signup">Lag bruker her</a>
      </div>
    </>
  );
}
