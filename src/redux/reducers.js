/**
/**
 * ¿que es un reducer?
 * Es una funcion que recibe dos parametros
 * 1. El estado actual
 * 2. La accion
 * 
 */
import { GET_USERS, GET_PRODUCTS, SET_USER } from "./actions";

const initialState = {
    users: [],
    copyUsers: [],
    products: [],
    copyProducts: [],
    user: null // Aquí guardaremos al usuario logueado
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state, //"copiar" el estado actual
                users: action.payload, //completar con el payload
                copyUsers: action.payload //completar con el payload
            }
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
        default:
            return { ...state }
    }
};

export default reducer;