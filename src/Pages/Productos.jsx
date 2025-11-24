import { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions';
import CardComp from '../Components/card/CardComp';
import ProductsPag from '../Components/productsPag/ProductsPag';
import OrderBar from '../Components/orderbar/orderBar';

function Productos() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.copyProducts);

    const currentPage = useSelector(state => state.currentPage);

    // 1. Definir items por página
    const [itemsPerPage] = useState(8);

    // 2. Calcular índices para el slice
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 3. Obtener los productos actuales
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    // 4. Función para cambiar de página
    const paginate = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (products.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="text-center mb-2 text-hw-orange" style={{ fontFamily: 'var(--font-racing)' }}>
                Catálogo Oficial
            </h2>
            <OrderBar />
            <Row>
                {currentProducts.map(product => (
                    <Col key={product._id} md={4} lg={3} className="mb-4">
                        <CardComp product={product} />
                    </Col>
                ))}
            </Row>
            <ProductsPag
                itemsPerPage={itemsPerPage}
                totalItems={products.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </Container>
    )
}
export default Productos
