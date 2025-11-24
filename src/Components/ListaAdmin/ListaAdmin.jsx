import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import EditForm from "../productForm/editForm";
import NotFound from '../PagNotFound/NotFoundPage';
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/actions";
import { Container, Card, Table, Row } from "react-bootstrap";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ListaAdmin() {
    const { isLoading, isAuthenticated } = useAuth0();
    const user = useSelector(state => state.loguedUser);

    /*  if (isLoading) {
         return <div className="text-center mt-5">Loading...</div>;
     }
 
     if (isAuthenticated && !user) {
         return <div className="text-center mt-5">Loading user data...</div>;
     } */

    if (!user || user.role !== 'admin') {
        return <NotFound />;
    }

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    const handleDelete = (_id) => {
        confirm("¿Estas seguro de eliminar este producto?") ?
            dispatch(deleteProduct(_id)) :
            alert("No se eliminó el producto");
    };
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const handleEdite = (_id) => {
        setEditingId(_id);
        setShowModal(true);
    };

    return (
        <Container className="py-5">
            <Row>
                <h2 className="mb-4 col-md-2 text-hw-orange">Productos</h2>
                <Button as={Link} to="/admin/nuevo" variant="success" size="lg" className="col-md-2 mx-5 mb-4">Nuevo Producto</Button>
            </Row>
            <Card className="p-3 shadow-sm">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => (
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
                                <td>{item.category}</td>
                                <td>{item.stock}</td>
                                <td>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => handleEdite(item._id)}
                                    >
                                        ✏️
                                    </Button>
                                    <Button
                                        className="mx-2"
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        X
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingId && <EditForm _id={editingId} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ListaAdmin;