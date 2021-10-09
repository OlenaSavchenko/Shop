import React, { Component } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Error from '../Error/Error';
import ProductsList from '../ProductsList/ProductList';
class App extends Component {
  state = {
    isModalOpen: false,
    items: [],
    error: null,
    favourites: [],
    selectedToCartItemId: null,
    itemsIsInCart: [],
  }

  componentDidMount = async () => {
    try {
      const response = await fetch('/products.json')
      const data = await response.json()
      this.setState({ items: data })
      this.setItemsInCart()
      this.setFavouriteItems()
    } catch (error) {
      this.setState({ error })
    }
  }

  setItemsInCart = () => {
    if (localStorage.getItem('inCart')) {
      const itemsIsInCartLS = JSON.parse(localStorage.getItem('inCart'))
      this.setState({ itemsIsInCart: itemsIsInCartLS })
    }
  }

  setFavouriteItems = () => {
    if (localStorage.getItem('favourites')) {
      const favouritesLS = JSON.parse(localStorage.getItem('favourites'))
      this.setState({ favourites: favouritesLS })
    }
  }

  onOpenBtnClick = (id) => {
    this.setState({ selectedToCartItemId: id })
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  onCheckBtnClick = (id) => {
    const newFavouritesArr = [...this.state.favourites]
    console.log("newFavouritesArr", newFavouritesArr);
    newFavouritesArr.includes(id)
      ? newFavouritesArr.splice(newFavouritesArr.indexOf(id), 1)
      : newFavouritesArr.push(id)

    this.setState({ favourites: newFavouritesArr })
    localStorage.setItem('favourites', JSON.stringify(newFavouritesArr))
  };

  onCartBtnClick = () => {
    const newItemsInCartArr = [...this.state.itemsIsInCart]
    const { selectedToCartItemId } = this.state
    newItemsInCartArr.push(selectedToCartItemId)
    const uniqueCartItems = [...new Set(newItemsInCartArr)];
    this.setState({ itemsIsInCart: uniqueCartItems })
    localStorage.setItem('inCart', JSON.stringify(uniqueCartItems))
    this.closeModal()
  }

  render() {
    const { isModalOpen, items, error, favourites } = this.state
    return (
      <>
        {error
          ? <Error />
          : <ProductsList products={items}
           favouritesProducts ={favourites}
            onClick={this.onOpenBtnClick}
            onCheckBtnClick={this.onCheckBtnClick} />
        }
        {isModalOpen && <Modal
          className="save-modal"
          header="Do you want to add the product to cart?"
          text="This product will be saved in your cart"
          closeButton={true}
          actions={
            <Button
              text="Ok"
              backgroundColor="#4CAF50"
              onClick={this.onCartBtnClick}
              type="button"
            />
          }
          onClick={this.closeModal} />
        }
      </>
    );
  }
}

export default App;
