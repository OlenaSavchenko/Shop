import { getProducts } from "../../api/products";
import { setProducts, setError, setFavourites, setInCart, setModalOpen } from "./actions";


export const getProdutsThunk = () => dispatch => {
    getProducts()
        .then(products => dispatch(setProducts(products)))
        .catch(error => dispatch(setError(error)))
}

export const getFavourites = () => dispatch => {
    if (localStorage.getItem('favourites')) {
        const favouritesLS = JSON.parse(localStorage.getItem('favourites'))
        dispatch(setFavourites(favouritesLS))
    }
}

export const getInCart = () => dispatch => {
    if (localStorage.getItem('inCart')) {
        const inCartLS = JSON.parse(localStorage.getItem('inCart'))
        dispatch(setInCart(inCartLS))
    }
}

export const setFavouritesThunk = (id, favourites) => dispatch => {
    favourites.includes(id)
        ? favourites.splice(favourites.indexOf(id), 1)
        : favourites.push(id)
    dispatch(setFavourites(favourites))
    localStorage.setItem('favourites', JSON.stringify(favourites))
}

export const setInCartThunk = (id, products) => dispatch => {
    products.push(id)
    const uniqueCartItems = [...new Set(products)];
    dispatch(setInCart(uniqueCartItems))
    localStorage.setItem('inCart', JSON.stringify(uniqueCartItems))
    dispatch(setModalOpen(false))
}

export const removeFromCart = (products) => dispatch => {
    dispatch(setInCart(products))
    dispatch(setModalOpen(false))
    localStorage.setItem('inCart', JSON.stringify(products))
}