import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Badge } from 'react-bootstrap';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('hw_orders') || '[]');
        setOrders(savedOrders);
    }, []);

    if (orders.length === 0) {
        return (
            <Container className="py-5 text-center">
                <h2>No tienes compras realizadas aún.</h2>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-hw-orange">Mis Compras</h2>
            {orders.map(order => (
                <Card key={order.id} className="mb-4 shadow-sm">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                        <div>
                            <strong>Orden #{order.id}</strong>
                            <span className="text-muted ms-3">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <Badge bg="success">{order.status}</Badge>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive borderless size="sm">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price}</td>
                                        <td>${item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <hr />
                        <div className="text-end">
                            <h5>Total Pagado: <span className="text-hw-blue">${order.total}</span></h5>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default Orders;
