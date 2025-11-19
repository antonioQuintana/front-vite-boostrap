import { Container, Row, Col } from "react-bootstrap";

const AppFooter = () => {
  return (
    // Usa clases de Bootstrap para el estilo (fondo oscuro, texto blanco, padding superior)
    <footer className="bg-dark text-white mt-auto py-3">
      <Container>
        <Row>
          <Col className="text-center">
            {/* m-0 elimina el margin inferior predeterminado del párrafo */}
            <p className="m-0">
              © 2025 Mi Sitio Web. Todos los derechos reservados.
              <br />
              Maquetado con Vite, React Router DOM y React Bootstrap.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
