import { Container, Row, Col } from "react-bootstrap";
import React from 'react';
import { FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './AppFooter.css';

const AppFooter = () => {
  // Reemplaza estas URLs con las de tus perfiles reales
  const instagramURL = "https://www.instagram.com/antoniio_quintana/";
  const linkedinURL = "https://www.linkedin.com/in/ricardo-quintana-7b4287196";
  const githubURL = "https://github.com/antonioQuintana";

  return (
    /* // Usa clases de Bootstrap para el estilo (fondo oscuro, texto blanco, padding superior)
    <footer style={{ backgroundColor: 'var(--hw-blue)' }} className="text-white mt-auto py-3">
      <Container>
        <Row>
          <Col className="text-center">
           
            <p className="m-0">
              © 2025 Mi Sitio Web. Todos los derechos reservados.
              <br />
              Maquetado con Vite, React Router DOM y React Bootstrap.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
   */
    <footer className="footer-container">

      <div className="footer-social-links">
        {/* Instagram */}
        <a
          href={instagramURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Profile"
          className="social-icon instagram"
        >
          <FaInstagram size={24} />
        </a>

        {/* LinkedIn */}
        <a
          href={linkedinURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="social-icon linkedin"
        >
          <FaLinkedinIn size={24} />
        </a>

        {/* GitHub */}
        <a
          href={githubURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="social-icon github"
        >
          <FaGithub size={24} />
        </a>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()} Quintana Antonio - Todos los derechos reservados.
      </p>
      <p className="footer-copyright">
        Maquetado con Vite, React Router DOM y React Bootstrap.
      </p>
    </footer>
  );
};

export default AppFooter;

/*const Footer = ({ name }) => {

  return (
        
    );
};

export default Footer; */
