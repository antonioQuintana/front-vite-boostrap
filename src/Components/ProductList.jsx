import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductList = () => {
    const { products } = useProducts();
    const { addToCart } = useCart();

    const handleAdd = (product) => {
        addToCart(product);
        toast.success(`Agregado: ${product.name}`);
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4 text-hw-orange" style={{ fontFamily: 'var(--font-racing)' }}>
                Catálogo Oficial
            </h2>
            <Row>
                {products.map(product => (
                    <Col key={product.id} md={4} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text className="text-muted small">
                                    {product.category}
                                </Card.Text>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 text-hw-blue">${product.price}</h5>
                                    <Button variant="primary" size="sm" onClick={() => handleAdd(product)}>
                                        Agregar +
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
