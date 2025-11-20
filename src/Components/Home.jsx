import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3); // Show first 3 products

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-center text-white py-5" style={{
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Container>
          <h1 className="display-2 mb-4" style={{ fontFamily: 'var(--font-racing)', textShadow: '4px 4px 0 #000' }}>
            <span className="text-hw-yellow">VELOCIDAD</span> SIN LÍMITES
          </h1>
          <p className="lead mb-5 fs-3">La colección más exclusiva de Hot Wheels en Corrientes.</p>
          <Link to="/tienda">
            <Button variant="danger" size="lg" className="px-5 py-3 fs-4 shadow-lg">
              VER CATÁLOGO COMPLETO
            </Button>
          </Link>
        </Container>
      </div>

      {/* Featured Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5 text-hw-blue" style={{ fontFamily: 'var(--font-racing)' }}>
          DESTACADOS DE LA SEMANA
        </h2>
        <Row>
          {featuredProducts.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img variant="top" src={product.image} style={{ height: '250px', objectFit: 'contain', padding: '20px' }} />
                <Card.Body className="text-center">
                  <Card.Title className="fs-4">{product.name}</Card.Title>
                  <Card.Text className="text-muted">{product.category}</Card.Text>
                  <h4 className="text-hw-orange mb-3">${product.price}</h4>
                  <Link to="/tienda">
                    <Button variant="outline-primary">Ver Detalles</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
