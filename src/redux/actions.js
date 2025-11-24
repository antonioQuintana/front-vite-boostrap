/* ¿que son la acciones?
 * Son la unica forma de poder enviar informacion o datos
 * desde cada componente al store a traves de redux
 * tipo de accion
 * ¿que es el payload? Es el dato que se envia 
 */

export const GET_PRODUCTS = "GET_PRODUCTS";
import axios from "axios";

/*export const GET_USERS = "GET_USERS";
export const getUsers = () => {
    return async (dispatch) => {
        const users = (await axios.get("https://jsonplaceholder.typicode.com/users")).data
        dispatch({
            type: GET_USERS,
            payload: users
        })//dispatch es un metodo que solicita la actualizacion del estado en redux, 
            //despacha la accion al reducer 
    };
}; //####### es una mala practica de seguridad traer los usuarios al front, hayque derivar la tarea al backend #########
*/

export const POST_USER = "POST_USER";
export const postUser = (user) => {
    return async (dispatch) => {
        try {
            // 1. Intentamos obtener el usuario primero para evitar el error 400 de duplicado
            const response = await axios.get(`/api/users/${user.email}`);
            dispatch({
                type: POST_USER,
                payload: { ...response.data, picture: response.data.picture || user.picture }
            });
        } catch (getError) {
            // 2. Si falla el GET (probablemente porque no existe), intentamos crearlo
            try {
                const response = await axios.post("/api/users/", user);
                dispatch({
                    type: POST_USER,
                    payload: { ...response.data, picture: user.picture }
                });
            } catch (postError) {
                console.error("Error al crear usuario:", postError);
            }
        }
    };
};
export const CLOSE_SESSION = "CLOSE_SESSION";
export const closeSession = () => {
    return {
        type: CLOSE_SESSION
    }
}
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
export const POST_ORDER = "POST_ORDER";
export const postOrder = (order) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/api/order", order);
            const createdOrder = response.data;
            dispatch({
                type: POST_ORDER,
                payload: createdOrder
            });
        } catch (error) {
            console.error("Error al crear orden:", error);
        }
    };
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
export const SOLD_CART = "SOLD_CART";
export const soldCart = () => {
    return {
        type: SOLD_CART
    }
};

