import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import NotFound from '../PagNotFound/NotFoundPage';
import CardComp from '../card/CardComp';
import { postProduct } from '../../redux/actions';

const ProductForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    if (!user || !user.isAdmin) {
        return <NotFound />;
    }

    const preset_name = "CtesWheels";
    const cloud_name = "dhatmlle3"

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [createdProduct, setCreatedProduct] = useState(null);

    // 1. Estado para almacenar los datos del formulario
    const [productData, setProductData] = useState({});

    const uploadImageToCloudinary = async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset_name);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const fileData = await response.json();
            return fileData.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create a local preview URL
            const previewUrl = URL.createObjectURL(file);
            setImage(previewUrl);
        }
    };

    // 2. Manejador genérico para la entrada de datos
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let newValue;

        (name === 'price' || name === 'stock')
            ? newValue = parseFloat(value)
            : newValue = value;

        setProductData({
            ...productData,
            [name]: newValue,
        });
    };

    // 3. Manejador para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = '';

        if (selectedFile) {
            try {
                imageUrl = await uploadImageToCloudinary(selectedFile);
            } catch (error) {
                alert('Error al subir la imagen. Inténtalo de nuevo.');
                setLoading(false);
                return;
            }
        }

        const finalProductData = {
            ...productData,
            imgDir: imageUrl || productData.imgDir
        };
        setCreatedProduct(finalProductData);
        dispatch(postProduct(finalProductData));
        setLoading(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Reset form if desired
        setProductData({});
        setImage('');
        setSelectedFile(null);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="card-title text-center mb-4">🚀 Cargar Nuevo Producto</h2>
                <form onSubmit={handleSubmit}>

                    {/* Campo: Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre del Producto</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={productData.name || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Campo: Description */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            value={productData.description || ''}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="row">
                        {/* Campo: Price */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={productData.price || ''}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01" // Permite decimales
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo: Stock */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                id="stock"
                                name="stock"
                                value={productData.stock || ''}
                                onChange={handleInputChange}
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Campo: Category */}
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Categoría</label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            value={productData.category || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Campo: Image Directory (imgDir) */}
                    <div className="mb-4">
                        <label htmlFor="imgDir" className="form-label">Imagen del Producto</label>
                        <input
                            type="file"
                            className="form-control"
                            id="imgDir"
                            name="imgDir"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <small className="form-text text-muted">Sube una imagen para el producto.</small>

                        {/* Previsualización de la imagen */}
                        {image && (
                            <div className="mt-3 text-center">
                                <img
                                    src={image}
                                    alt="Vista previa"
                                    className="img-thumbnail"
                                    style={{ height: '350px' }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Botón de envío */}
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                            {loading ? 'Cargando...' : 'Guardar Producto'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal de éxito */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>¡Producto Creado!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center mb-3">El producto se ha cargado exitosamente.</p>
                    {createdProduct && (
                        <div className="d-flex justify-content-center">
                            <div style={{ width: '18rem' }}>
                                <CardComp product={createdProduct} />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductForm;