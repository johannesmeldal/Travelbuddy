import React, { useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import DropdownMenu from "./dropDownMenu.js";
import UpdateBioForm from "./Bio";
import UpdateUserNameForm from "./UserName";
import UpdateUserTagForm from "./UserTag";
import UpdateCountryForm from "./FavouriteCountry";

export default function OppdaterProfilen() {
  const [error] = useState("");

  async function handleSubmitt(event) {
    event.preventDefault();
  }

  return (
    <>
      <Card style={{ width: "50%", left: "25%", top: "10%" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Update profile</h2>
          <DropdownMenu />
          <br></br>
          <UpdateUserNameForm />
          <br></br>
          <UpdateUserTagForm />
          <br></br>
          <UpdateCountryForm />
          <br></br>
          <UpdateBioForm />

          {/* <button>Profile</button> */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmitt}>
            {/* <Form.Group id="country">
              <Form.Label> Velg ditt favoritt</Form.Label>
              <CountrySelector ref={countryRef} />
            </Form.Group> */}

            <Form.Group>
              <br></br>
            </Form.Group>

            <Form.Group>
              <br></br>
            </Form.Group>

            {/* <Button disabled={loading}  className="w-100" type="submit">
              Update Profile
            </Button> */}
          </Form>
          <div className="w-100 text-center mt-3">
            <a class="btn btn-primary " href="/profile" role="button">
              Profile
            </a>
            <br></br>
            <br></br>
            <Link to="/forgot-password">Forgot Password? :O</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
