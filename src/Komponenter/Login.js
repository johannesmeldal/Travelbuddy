import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import bilde from "../img/landscape.jpg";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import "../css/login.css";
export default function Login() {
  const epostRef = useRef();
  const passordRef = useRef();
  const { logginn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmitt(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await logginn(epostRef.current.value, passordRef.current.value);
      history.push("/");
      history.go(0);
    } catch {
      setError("Feil ved innlogging");
    }
    setLoading(false);
  }
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img src={bilde} class="img-fluid" alt="Alt" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div data-testid="login" className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Logg inn</p>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="divider d-flex align-items-center my-4"></div>
           <Form onSubmit={handleSubmitt}>
             <Form.Group id="epost">
               <Form.Label> Epost</Form.Label>
               <Form.Control data-testid="email" type="epost" ref={epostRef} required />
             </Form.Group>
             <Form.Group id="passord">
               <Form.Label style={{
                 marginTop: '10px',
               }}> Passord</Form.Label>
               <Form.Control data-testid="password" type="password" ref={passordRef} required />
             </Form.Group>
             <Button data-testid="loginButton" disabled={loading} className="w-100" type="submit" style={{
               marginTop: '20px',
             }}>
               Logg inn
             </Button>
           </Form>
           <div className="d-flex justify-content-between mb-4">
              <a href="/forgot-password">Glemt passord?</a>
            </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <p className="small fw-bold mt-2 pt-1 mb-2">Har du ikke en bruker? <a href="/signup" className="link-danger">Lag bruker her</a></p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
