import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';
import './CardStyle.css';

function CardComp({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        alert('Producto agregado al carrito!');
    };

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={product.imgDir}
                style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted small">
                    {product.category}
                </Card.Text>
                <Card.Text>
                    {product.description.length > 40
                        ? product.description.substring(0, 40) + '...'
                        : product.description}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-hw-blue">${product.price}</h5>
                    <Button variant="primary" size="sm" onClick={handleAddToCart}>
                        Agregar +
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardComp;