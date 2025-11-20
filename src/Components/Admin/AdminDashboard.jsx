import React from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';

const AdminDashboard = () => {
    const { products, deleteProduct } = useProducts();

    return (
        <Container className="py-5">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2 className="text-hw-orange">Panel de Administración</h2>
                </Col>
                <Col className="text-end">
                    <Link to="/admin/new">
                        <Button variant="success">+ Nuevo Producto</Button>
                    </Link>
                </Col>
            </Row>

            <Table striped bordered hover responsive className="shadow-sm bg-white">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                <img src={product.image} alt={product.name} style={{ width: '50px' }} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <Link to={`/admin/edit/${product.id}`}>
                                    <Button variant="warning" size="sm" className="me-2">Editar</Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => {
                                        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
                                            deleteProduct(product.id);
                                        }
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminDashboard;
