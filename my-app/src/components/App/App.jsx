import { useState, useEffect } from 'react';
import { getProducts } from '../../api/api';
import Nav from '../Nav/Nav';
import ProductsList from '../ProductsList/ProductList';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Error from '../Error/Error';

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
      {error
        ? <Error />
        : <ProductsList products={products}
          favourites={favourites}
          inCart={inCart}
          onAddBtnClick={onAddToCartBtnClick}
          onDeleteBtnClick={onDeleteFromCartBtnClick}
          onSelectBtnClick={onSelectBtnClick} />
      }
      {isAddModalOpen && <Modal
        className="save-modal"
        header="Do you want to add the product to cart?"
        text="This product will be saved in your cart"
        closeButton={true}
        actions={
          <Button
            text="Ok"
            backgroundColor="#4CAF50"
            onClick={onApproveAddBtnClick}
            type="button"
          />
        }
        onClick={closeAddModal} />
      }
      {isRemoveModalOpen && <Modal
        className="delete-modal"
        header="Do you want to delete this product from cart?"
        text="This product will be deleted from your cart"
        closeButton={true}
        actions={
          <>
            <Button
              type="button"
              text="Ok"
              backgroundColor="#b93b3b"
              className="delete-modal__btn delete-modal__btn--approve"
              onClick={onApproveDeleteBtnClick} />
            <Button
              type="button"
              text="Cancel"
              backgroundColor="#b93b3b"
              onClick={closeRemoveModal}
              className="delete-modal__btn" />
          </>
        }
        onClick={closeRemoveModal}
      />
      }
    </>
  );
}

export default App;
