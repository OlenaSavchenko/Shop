import { composeWithDevTools } from 'redux-devtools-extension'; //чтобы использовать tools i middlewares одновременно
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { productsReducer } from "./products/reducer";



export const store = createStore(productsReducer, composeWithDevTools(applyMiddleware(thunk)))

