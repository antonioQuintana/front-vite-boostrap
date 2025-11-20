import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate processing
        const loadingToast = toast.loading('Procesando pago...');

        setTimeout(() => {
            toast.dismiss(loadingToast);

            // Save order to local storage (mock backend)
            const newOrder = {
                id: Math.floor(Math.random() * 1000000),
                date: new Date().toISOString(),
                items: cart,
                total: total,
                status: 'Completado',
                shipping: formData
            };

            const existingOrders = JSON.parse(localStorage.getItem('hw_orders') || '[]');
            localStorage.setItem('hw_orders', JSON.stringify([newOrder, ...existingOrders]));

            clearCart();
            toast.success('¡Compra realizada con éxito!');
            navigate('/compras');
        }, 2000);
    };

    if (cart.length === 0) {
        return <div className="text-center py-5"><h2>No hay items en el carrito para pagar.</h2></div>;
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-hw-orange">Finalizar Compra</h2>
            <Row>
                <Col md={8}>
                    <Card className="p-4 shadow-sm mb-4">
                        <h4 className="mb-3">Datos de Envío y Pago</h4>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control required name="fullName" onChange={handleChange} />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control required name="address" onChange={handleChange} />
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control required name="city" onChange={handleChange} />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={4}>
                                    <Form.Label>Código Postal</Form.Label>
                                    <Form.Control required name="zip" onChange={handleChange} />
                                </Col>
                            </Row>

                            <hr className="my-4" />

                            <h5 className="mb-3">Método de Pago (Simulado)</h5>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Label>Número de Tarjeta</Form.Label>
                                    <Form.Control required name="cardNumber" placeholder="0000 0000 0000 0000" onChange={handleChange} />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Vencimiento</Form.Label>
                                    <Form.Control required name="expiry" placeholder="MM/YY" onChange={handleChange} />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control required name="cvv" placeholder="123" onChange={handleChange} />
                                </Col>
                            </Row>

                            <Button variant="success" type="submit" size="lg" className="w-100 mt-3">
                                Pagar ${total}
                            </Button>
                        </Form>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="p-3 shadow-sm">
                        <h4 className="mb-3">Resumen</h4>
                        {cart.map(item => (
                            <div key={item.id} className="d-flex justify-content-between mb-2">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Total</span>
                            <span className="text-hw-blue">${total}</span>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
