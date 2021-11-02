import { SET_PRODUCTS, SET_ERROR, SET_FAVOURITES, SET_IN_CART, SET_MODAL_OPEN, CLEAR_CART } from './types'

export const setProducts = data => {
    return { type: SET_PRODUCTS, payload: data }
}

export const setError = err => {
    return { type: SET_ERROR, payload: err }
}

export const setFavourites = data => {
    return { type: SET_FAVOURITES, payload: data }
}

export const setInCart = data => {
    return { type: SET_IN_CART, payload: data }
}

export const setModalOpen = boolean => {
    return { type: SET_MODAL_OPEN, payload: boolean }
}

export const clearCart = () => {
    return { type: CLEAR_CART, payload: [] }
}