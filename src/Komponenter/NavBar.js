import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsPersonCircle, BsHouseDoorFill } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";


const NavStyle = {
  opacity: "0.7",
};

function NavBar() {
  const { currentBruker } = useAuth();

  var email;
  if (currentBruker === null) {
    email = "Not logged in";
  } else {
    email = "Logged in as: " + currentBruker.email;
  }
  return (
    <Navbar data-testid="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" style={NavStyle}>
      <Container>
        <Navbar.Brand data-testid="brand" href="/">TravelBuddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link data-testid="home" href="/"><BsHouseDoorFill size={20}/> &nbsp; Home</Nav.Link>
            <Nav.Link data-testid="profile" href="/profile"><BsPersonCircle size={20}/> &nbsp; Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text data-testid="email">
            <a href="/profile">{email}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
