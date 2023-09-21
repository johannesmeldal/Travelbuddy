import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import bilde from "../img/landscape.jpg";
import {MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';

export default function Signup() {
  const epostRef = useRef();
  const passordRef = useRef();
  const passordbekreftelseRef = useRef();
  const { lagEnBruker } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmitt(e) {
    e.preventDefault();

    //Setter en return rett etter for vil at den skal stoppe
    if (passordRef.current.value !== passordbekreftelseRef.current.value) {
      return setError("Passordene er ikke like:(");
    }

    try {
      setError("");
      setLoading(true);

      const succes = await lagEnBruker(
        epostRef.current.value,
        passordRef.current.value
      );

      if (!succes) {
        setError("Feil ved opprettelse av bruker");
      }
    } catch {
      setError("Feil ved opprettelse av bruker");
    }

    setLoading(false);
  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src={bilde} class="img-fluid" alt="Alt" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div data-testid="signup" className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Registrer deg her</p>
          </div>

          <div className="divider d-flex align-items-center my-4"></div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmitt}>
            <Form.Group id="epost">
              <Form.Label> Epost</Form.Label>
              <Form.Control type="epost" data-testid="epost" ref={epostRef} required />
            </Form.Group>
            <Form.Group id="passord">
              <Form.Label> Passord</Form.Label>
              <Form.Control type="password" data-testid="passord" ref={passordRef} required />
            </Form.Group>
            <Form.Group id="passordbekreftelse">
              <Form.Label> Bekreft passord</Form.Label>
              <Form.Control
                type="password"
                data-testid="passordbekreftelse"
                ref={passordbekreftelseRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" data-testid="bekreft" type="submit" style={{
               marginTop: '20px',
             }}>
              {" "}
              Lag bruker
            </Button>
          </Form>

          <div className='text-center text-md-start mt-4 pt-2'>
            <p className="small fw-bold mt-2 pt-1 mb-2">Har du allerede en bruker? <a href="/login" className="link-danger">Logg inn her</a></p>
          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}
