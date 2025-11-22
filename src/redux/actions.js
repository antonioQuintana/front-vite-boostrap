/* ¿que son la acciones?
 * Son la unica forma de poder enviar informacion o datos
 * desde cada componente al store a traves de redux
 * tipo de accion
 * ¿que es el payload? Es el dato que se envia 
 */
export const GET_USERS = "GET_USERS";
export const GET_PRODUCTS = "GET_PRODUCTS";

import axios from "axios";

export const getUsers = () => {
    return async (dispatch) => {
        const users = (await axios.get("https://jsonplaceholder.typicode.com/users")).data
        dispatch({
            type: GET_USERS,
            payload: users
        })/*Dispatch es un metodo que solicita la actualizacion del estado en redux, 
            despacha la accion al reducer */
    };
};

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/api/products");
            const products = response.data;
            dispatch({
                type: GET_PRODUCTS,
                payload: products
            });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            // Opcional: Podrías despachar una acción de error aquí si tuvieras una
        }
    };
};
export const POST_PRODUCT = "POST_PRODUCT";
export const postProduct = (product) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/api/products", product);
            const createdProduct = response.data;
            dispatch({
                type: POST_PRODUCT,
                payload: createdProduct
            });
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };
};

export const PUT_PRODUCT = "PUT_PRODUCT";
export const putProduct = (product) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/products/${product._id}`, product);
            const updatedProduct = response.data;
            dispatch({
                type: PUT_PRODUCT,
                payload: updatedProduct
            });
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };
};
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const deleteProduct = (_id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/products/${_id}`);
            dispatch({
                type: DELETE_PRODUCT,
                payload: _id
            });
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };
};

export const SET_USER = "SET_USER";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
};


export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (product) => {
    return (dispatch) => {
        dispatch({
            type: ADD_TO_CART,
            payload: product
        })

    }
};

export const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id
    }
};

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
};
