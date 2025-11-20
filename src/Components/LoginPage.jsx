import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>;
    if (isAuthenticated) return <Navigate to="/" />;

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            <Card className="text-center p-5 shadow-lg" style={{ maxWidth: '400px', borderRadius: '15px' }}>
                <div className="mb-4">
                    <h1 style={{ fontFamily: 'var(--font-racing)', color: 'var(--hw-orange)' }}>CtesWheels</h1>
                    <p className="text-muted">Ingresa para gestionar tus compras y perfil.</p>
                </div>

                <Button
                    variant="primary"
                    size="lg"
                    className="mb-3 w-100"
                    onClick={() => loginWithRedirect()}
                >
                    Iniciar Sesión / Registrarse
                </Button>

                <div className="text-muted small mt-3">
                    <p>Acceso seguro vía Auth0</p>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
