import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // In a real app, you would check for a specific role here, e.g.:
    // const { user } = useAuth0();
    // if (!user['https://myapp.com/roles'].includes('admin')) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
