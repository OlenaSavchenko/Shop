import { useState, useEffect } from 'react';
import { getProducts } from '../../api/api';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import ProductsList from '../../pages/ProductsList/ProductList';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Error from '../../pages/Error/Error';
import NotFound from "../../pages/NotFound/NotFound.jsx";
import Cart from '../../pages/Cart.jsx';
import Favourites from '../../pages/Favourite.jsx';


const App = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [favourites, setFavourites] = useState([])
  const [inCart, setInCart] = useState([])
  const [inCartProductId, setInCartProductId] = useState(null)
  const [outCartProductId, setOutCartProductId] = useState(null)

  useEffect(() => {
    getProducts()
      .then(products => setProducts(products))
      .catch(error => setError(error))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('inCart')) {
      const inCartLS = JSON.parse(localStorage.getItem('inCart'))
      setInCart(inCartLS)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('favourites')) {
      const favouritesLS = JSON.parse(localStorage.getItem('favourites'))
      setFavourites(favouritesLS)
    }
  }, [])

  const onAddToCartBtnClick = (id) => {
    setInCartProductId(id)
    setAddModalOpen(true)
  }

  const onDeleteFromCartBtnClick = (id) => {
    setOutCartProductId(id)
    setRemoveModalOpen(true)
  }

  const closeAddModal = () => {
    setAddModalOpen(false)
  }

  const closeRemoveModal = () => {
    setRemoveModalOpen(false)
  }

  const onSelectBtnClick = (id) => {
    const selectedProducts = [...favourites]
    selectedProducts.includes(id)
      ? selectedProducts.splice(selectedProducts.indexOf(id), 1)
      : selectedProducts.push(id)
    setFavourites(selectedProducts)
    localStorage.setItem('favourites', JSON.stringify(selectedProducts))
  };

  const onApproveAddBtnClick = () => {
    const productsInCart = [...inCart]
    productsInCart.push(inCartProductId)
    const uniqueCartItems = [...new Set(productsInCart)];
    setInCart(uniqueCartItems)
    localStorage.setItem('inCart', JSON.stringify(uniqueCartItems))
    closeAddModal()
  }

  const onApproveDeleteBtnClick = () => {
    const filtredProducts = inCart.filter(id => id !== outCartProductId)
    setInCart(filtredProducts)
    localStorage.setItem('inCart', JSON.stringify(filtredProducts))
    closeRemoveModal()
  }
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home">
          {error
            ? <Error />
            : <ProductsList
              products={products} favourites={favourites}
              onAddBtnClick={onAddToCartBtnClick} onSelectBtnClick={onSelectBtnClick} />
          }
          {isAddModalOpen && <Modal
            className="save-modal" header="Do you want to add the product to cart?"
            closeButton={true} actions={
              <Button
                type="button" text="Ok" backgroundColor="#4CAF50"
                onClick={onApproveAddBtnClick}
              />
            }
            onClick={closeAddModal} />
          }
        </Route>
        <Route exact path="/cart">
          <Cart
            products={products} inCart={inCart} favourites={favourites}
            onDeleteBtnClick={onDeleteFromCartBtnClick}
            onSelectBtnClick={onSelectBtnClick} />

          {isRemoveModalOpen && <Modal
            className="delete-modal" header="Do you want to delete this product from cart?"
            closeButton={true} actions={
              <>
                <Button
                  type="button" text="Ok" backgroundColor="#b93b3b"
                  className="delete-modal__btn delete-modal__btn--approve"
                  onClick={onApproveDeleteBtnClick} />
                <Button
                  type="button" text="Cancel" backgroundColor="#b93b3b"
                  className="delete-modal__btn" onClick={closeRemoveModal}
                />
              </>
            }
            onClick={closeRemoveModal}
          />
          }
        </Route>
        <Route exact path="/favourites">
          <Favourites
            products={products} favourites={favourites}
            onAddBtnClick={onAddToCartBtnClick} onSelectBtnClick={onSelectBtnClick} />

          {isAddModalOpen && <Modal
            className="save-modal" header="Do you want to add the product to cart?"
            closeButton={true} actions={
              <Button
                type="button" text="Ok" backgroundColor="#4CAF50"
                onClick={onApproveAddBtnClick}
              />
            }
            onClick={closeAddModal} />
          }
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
