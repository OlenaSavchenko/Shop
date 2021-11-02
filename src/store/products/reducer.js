import { SET_PRODUCTS, SET_ERROR, SET_FAVOURITES, SET_IN_CART, SET_MODAL_OPEN, CLEAR_CART } from './types'

const initialState = {
    goods: [],
    favourites: [],
    inCart: [],
    isModalActive: false,
    error: null
}
export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return ({ ...state, goods: action.payload })
        case SET_ERROR:
            return ({ ...state, error: action.payload })
        case SET_FAVOURITES:
            return ({ ...state, favourites: action.payload })
        case SET_IN_CART:
            return ({ ...state, inCart: action.payload })
        case SET_MODAL_OPEN:
            return ({ ...state, isModalActive: action.payload })
        case CLEAR_CART:
            return ({ ...state, inCart: action.payload })
        default:
            return state;
    }
}

