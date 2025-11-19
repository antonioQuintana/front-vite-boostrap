import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Página de Inicio</h1>
          <p>Bienvenido a nuestra web con React Router y React Bootstrap.</p>
          <Button variant="primary">Botón de Bootstrap</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Maquetación Rápida</Card.Title>
              <Card.Text>Usando componentes de React Bootstrap.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
