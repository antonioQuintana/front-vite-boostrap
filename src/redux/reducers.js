/**
 * ¿que es un reducer?
 * Es una funcion que recibe dos parametros
 * 1. El estado actual
 * 2. La accion
 * 
 */
import {
    GET_PRODUCTS, SET_USER, SET_CURRENT_PAGE,
    ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, POST_PRODUCT, PUT_PRODUCT,
    DELETE_PRODUCT, POST_USER
} from "./actions";

const initialState = {
    products: [],
    copyProducts: [],
    user: null,
    currentPage: 1, // Página actual global
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    loguedUser: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                copyProducts: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case POST_USER:
            return {
                ...state,
                loguedUser: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        /* case GET_CART:
            return {
                ...state,
                cart: action.payload,
            } */
        case ADD_TO_CART:

            const itemInCart = state.cart.find(item => item._id === action.payload._id);
            let newCart;
            if (itemInCart) {
                newCart = state.cart.map(item =>
                    item._id === action.payload._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newCart = [...state.cart, { ...action.payload, quantity: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart,
            }
        case REMOVE_FROM_CART:
            const newCartRemove = state.cart.filter((item) => item._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(newCartRemove));
            return {
                ...state,
                cart: newCartRemove,
            }
        case CLEAR_CART:
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: [],
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case PUT_PRODUCT:
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.payload._id ? action.payload : product
                )
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product =>
                    product._id !== action.payload
                )
            }
        default:
            return { ...state }
    }
};

export default reducer;