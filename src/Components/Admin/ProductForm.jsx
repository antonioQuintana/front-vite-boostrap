import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addProduct, updateProduct } = useProducts();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: ''
    });

    useEffect(() => {
        if (id) {
            const product = products.find(p => p.id === parseInt(id));
            if (product) {
                setFormData(product);
            }
        }
    }, [id, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price)
        };

        if (id) {
            updateProduct(parseInt(id), productData);
        } else {
            addProduct(productData);
        }
        navigate('/admin');
    };

    return (
        <Container className="py-5">
            <Card className="p-4 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 className="mb-4 text-center">{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Originals">Originals</option>
                            <option value="Real World">Real World</option>
                            <option value="Monster Trucks">Monster Trucks</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL de Imagen</Form.Label>
                        <Form.Control
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                        {formData.image && (
                            <div className="mt-2 text-center">
                                <img src={formData.image} alt="Preview" style={{ maxHeight: '100px' }} />
                            </div>
                        )}
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            {id ? 'Guardar Cambios' : 'Crear Producto'}
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/admin')}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default ProductForm;
