import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('hw_products');
        return saved ? JSON.parse(saved) : initialProducts;
    });

    useEffect(() => {
        localStorage.setItem('hw_products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() };
        setProducts([...products, newProduct]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
