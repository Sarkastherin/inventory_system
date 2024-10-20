import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import "../styles/NavBar.css";

import { NavLink } from "react-router-dom";

function NavBar({theme, handleTheme}) {
  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
      <Container>
      <NavLink className="navbar-brand" to="/inventory_system/"><i className="bi bi-box-seam-fill"></i> Gestión de Stock</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/inventory_system/movimientos">
              Movimientos
            </NavLink>
            <NavLink className="nav-link" to="/inventory_system/stock">
              Stock
            </NavLink>
            <NavLink className="nav-link" to="/inventory_system/consultas">
              Consultas
            </NavLink>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Button
              className="button-toggle-theme rounded-circle"
              variant={theme === 'dark' ? 'light' : 'dark'}
              onClick={handleTheme}
            >
              {theme === "dark" ? (
                <i className="bi bi-sun-fill"></i>
              ) : (
                <i className="bi bi-moon-stars-fill"></i>
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
