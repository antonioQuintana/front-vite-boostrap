import React from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, clearCart, total } = useCart();

    if (cart.length === 0) {
        return (
            <Container className="py-5 text-center">
                <h2>Tu carrito está vacío</h2>
                <Link to="/tienda">
                    <Button variant="primary" className="mt-3">Ir a la Tienda</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-hw-orange">Tu Carrito</h2>
            <Card className="p-3 shadow-sm">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cant.</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '50px', marginRight: '10px' }}
                                        />
                                        {item.name}
                                    </div>
                                </td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price * item.quantity}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        X
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button variant="outline-danger" onClick={clearCart}>Vaciar Carrito</Button>
                    <div className="text-end">
                        <h4>Total: <span className="text-hw-blue">${total}</span></h4>
                        <Button variant="success" size="lg" className="mt-2">Finalizar Compra</Button>
                    </div>
                </div>
            </Card>
        </Container>
    );
};

export default Cart;
