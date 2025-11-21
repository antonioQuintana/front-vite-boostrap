import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AppNavbar() {
  const { logout } = useAuth0();
  const user = useSelector(state => state.user);

  return (
    <Navbar expand="md" className="navbar-dark">
      < Container fluid >
        <Navbar.Brand as={Link} to="/">
          <span style={{ color: 'var(--hw-yellow)' }}>Ctes</span>
          <span style={{ color: 'var(--hw-white)' }}>Wheels</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/tienda">Tienda</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
            <NavDropdown title="Perfil" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/compras">Mis Compras</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/notificaciones">
                Notificaciones
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/mi-perfil">
                Editar Perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="button logout"
              >
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Bienvenido {user == null ? "" : user.name} !
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="warning">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container >
    </Navbar >
  );
}

export default AppNavbar;
