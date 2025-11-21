import { useState } from 'react';
import { useSelector } from 'react-redux';
import NotFound from '../PagNotFound/NotFoundPage';

const ProductForm = () => {
    const user = useSelector(state => state.user);
    if (!user || !user.isAdmin) {
        return <NotFound />;
    }
    // 1. Estado para almacenar los datos del formulario
    const [productData, setProductData] = useState({});

    // 2. Manejador genérico para la entrada de datos
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Convertir a número si el campo es 'price' o 'stock'
        const newValue = (name === 'price' || name === 'stock')
            ? parseFloat(value)
            : value;

        setProductData({
            ...productData,
            [name]: newValue,
        });
    };

    // 3. Manejador para el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Datos del Producto a enviar:', productData);

        // Aquí es donde normalmente enviarías 'productData' a una API o a tu lógica de estado global

        alert(`Producto ${productData.name} listo para cargar. Revisa la consola.`);

        // Opcional: limpiar el formulario después del envío
        // setProductData({
        //   name: '',
        //   description: '',
        //   price: 0,
        //   stock: 0,
        //   category: '',
        //   imgDir: '',
        // });
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
                            value={productData.name}
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
                            value={productData.description}
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
                                    value={productData.price}
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
                                value={productData.stock}
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
                            value={productData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Campo: Image Directory (imgDir) */}
                    <div className="mb-4">
                        <label htmlFor="imgDir" className="form-label">Ruta de Imagen (imgDir)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imgDir"
                            name="imgDir"
                            value={productData.imgDir}
                            onChange={handleInputChange}
                            placeholder="ej: /assets/porsche911.jpg"
                        />
                        <small className="form-text text-muted">La ruta o URL de la imagen del producto.</small>
                    </div>

                    {/* Botón de envío */}
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Guardar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;