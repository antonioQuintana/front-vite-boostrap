function ProductsPag({ itemsPerPage, totalItems, paginate, currentPage }) {

    const pageNumbers = [];

    // Calcular la cantidad total de páginas
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example" className="mt-4">
            <ul className="pagination justify-content-center">
                {/* Botón Previous */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                        &laquo;
                    </button>
                </li>

                {/* Números de página */}
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}

                {/* Botón Next */}
                <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default ProductsPag;