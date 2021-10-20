import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { isInCart } from "../../store/products/selectors";
import { getProdutsThunk as getProducts, getFavourites, getInCart, removeFromCart, setInCartThunk as setInCart } from "../../store/products/operations";
import { setModalOpen } from "../../store/products/actions"
import Nav from '../Nav/Nav';
import ProductsList from '../../pages/ProductsList/ProductList';
import Cart from '../../pages/Cart';
import Favourites from '../../pages/Favourite';
import NotFound from "../../pages/NotFound/NotFound";


const App = () => {
  const dispatch = useDispatch()
  const inCart = useSelector(isInCart)
  const [inCartProductId, setInCartProductId] = useState(null)
  const [outCartProductId, setOutCartProductId] = useState(null)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getInCart())
    dispatch(getFavourites())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const onAddClick = (id) => {
    setInCartProductId(id)
    dispatch(setModalOpen(true))
  }

  const onRemoveClick = (id) => {
    setOutCartProductId(id)
    dispatch(setModalOpen(true))
  }

  const onConfirmAddClick = () => {
    const productsInCart = [...inCart]
    dispatch(setInCart(inCartProductId, productsInCart))
  }

  const onConfirmRemoveClick = () => {
    const filtredProducts = inCart.filter(id => id !== outCartProductId)
    dispatch(removeFromCart(filtredProducts))
  }
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home">
          <ProductsList onAddClick={onAddClick} onConfirmAddClick={onConfirmAddClick} />
        </Route>
        <Route exact path="/cart">
          <Cart onRemoveClick={onRemoveClick} onConfirmRemoveClick={onConfirmRemoveClick} />
        </Route>
        <Route exact path="/favourites">
          <Favourites onAddClick={onAddClick} onConfirmAddClick={onConfirmAddClick} />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
