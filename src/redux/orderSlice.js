/* import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        productsCopy: [],
    },
    reducers: {
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
            state.productsCopy = action.payload
        },
        sortProducts: (state, action) => {
            const sortedProducts = state.productsCopy.sort((a, b) => {
                if (action.payload === "asc") {
                    return a.price - b.price
                } else {
                    return b.price - a.price
                }
            })
            state.productsCopy = sortedProducts
        }
    }
})
export const { setAllProducts, sortProducts } = productsSlice.actions
export default productsSlice.reducer */
//no me sirve este formato porque ya tengo los productos en el store