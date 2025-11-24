import { Container, Table, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, clearCart, soldCart } from '../../redux/actions';
import { postOrder } from '../../redux/actions';
import LoginButton from '../../AuthComponents/LoginButton';
import { useState } from 'react';

const Carrito = () => {
    const dispatch = useDispatch();
    let cart = useSelector(state => state.cart);
    const loguedUser = useSelector(state => state.loguedUser);
    const [finalizado, setFinalizado] = useState(false);
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleRemove = (_id) => {
        dispatch(removeFromCart(_id));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

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
    const handleConfirm = (cart) => {
        if (confirm("¿Estas seguro de confirmar la compra? (aca iria la ventana de pago pero por ahora nos salteamos ese paso)")) {
            const cartProducts = cart.map(item => ({
                productId: item._id,
                quantity: item.quantity
            }));
            const order = {
                userId: loguedUser._id,
                products: cartProducts,
                totalAmount: total,
                status: "Pending"
            }
            dispatch(postOrder(order));


            alert("Su pago esta siendo procesado");
            setFinalizado(true);
            dispatch(soldCart());
            cart = [];
        } else {
            alert("Por favor inicia sesión para confirmar la compra");
        }
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
                            <tr key={item._id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={item.imgDir}
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
                                        onClick={() => handleRemove(item._id)}
                                    >
                                        X
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button variant="outline-danger" onClick={handleClear}>Vaciar Carrito</Button>
                    <div className="text-end">
                        <h4>Total: <span className="text-hw-blue">${total.toFixed(2)}</span></h4>
                        {finalizado ? (
                            <Button variant="warning" size="lg" className="mt-2">Compra finalizada</Button>
                        ) : (
                            loguedUser ? (
                                <Button variant="success" size="lg" className="mt-2" onClick={() => handleConfirm(cart)}>Finalizar Compra</Button>
                            ) : (
                                <LoginButton />
                            )
                        )}

                    </div>
                </div>
            </Card>
        </Container>
    );
};

export default Carrito;