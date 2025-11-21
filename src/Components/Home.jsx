import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../AuthComponents/LoginButton";
import LogoutButton from "../AuthComponents/LogoutButton";
import Profile from "../AuthComponents/Profile";
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardComp from './card/CardComp';

const Home = () => {
  const products = useSelector(state => state.products);
  const featuredProducts = products.slice(0, 3); // Show first 3 products
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-state">
          <div className="error-title">Oops!</div>
          <div className="error-message">Something went wrong</div>
          <div className="error-sub-message">{error.message}</div>
        </div>
      </div>
    );
  }

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
          {isAuthenticated ? (
            <div className="logged-in-section">
              <h5 className="logged-in-message">
                ✅ Sesión inciada con éxito!
              </h5>
              <h2 className="profile-section-title">Tu Perfil</h2>
              <div className="profile-card">
                <Profile />
              </div>
              <LogoutButton />
            </div>
          ) : (
            <div className="action-card">
              <h3 className="action-text">Para empezar ingresa con tu cuenta</h3>
              <LoginButton />
            </div>
          )}
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
            <Col key={product._id} md={4} className="mb-4">
              <CardComp product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;