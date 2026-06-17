import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: localStorage.getItem('cartId') || null,
        drawerOpen: false,
    },
    reducers: {
        setCartId: (s, a) => { s.cartId = a.payload; localStorage.setItem('cartId', a.payload) },
        clearCartId: (s) => { s.cartId = null; localStorage.removeItem('cartId') },
        openDrawer: (s) => { s.drawerOpen = true },
        closeDrawer: (s) => { s.drawerOpen = false },
    },
})

export const { setCartId, clearCartId, openDrawer, closeDrawer } = cartSlice.actions
export const selectCartId = (s) => s.cart.cartId
export const selectDrawerOpen = (s) => s.cart.drawerOpen
export default cartSlice.reducer