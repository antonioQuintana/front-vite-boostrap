import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";

function AppNavbar() {
  const { logout, user, isAuthenticated } = useAuth0();
  return (
    <Navbar expand="md" className="navbar-dark">
      <Container fluid>
        <Navbar.Brand href="/">
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
            <Nav.Link href="/tienda">Tienda</Nav.Link>
            <Nav.Link href="/carrito">Carrito</Nav.Link>
            {isAuthenticated && (
              <NavDropdown title={user?.name || "Perfil"} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/compras">Mis Compras</NavDropdown.Item>
                <NavDropdown.Item href="/notificaciones">
                  Notificaciones
                </NavDropdown.Item>
                <NavDropdown.Item href="/mi-perfil">
                  Editar Perfil
                </NavDropdown.Item>
                {/* Mock Admin Link - In real app check roles */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="/admin">Admin Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="/"
                  onClick={() =>
                    logout({ logoutParams: { returnTo: window.location.origin } })
                  }
                  className="text-danger"
                >
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar auto..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="warning">BUSCAR</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
