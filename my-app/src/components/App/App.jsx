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
    isCheked:false
  }

  componentDidMount = async () => {
    try {
      const response = await fetch('/products.json')
      const data = await response.json()
      this.setState({ items: data })
    } catch (error) {
      this.setState({ error })
    }
  }

  onOpenBtnClick = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  onCheckBtnClick = (e) => {
    e.preventDefault();
    this.state.isCheked
      ? this.setState({ isCheked: false })
      : this.setState({ isCheked: true });
      console.log("isCheked");
  };


  render() {
    const { isModalOpen, items, error } = this.state
    return (
      <>
        {error
          ? <Error />
          : <ProductsList products={items}
            onClick={this.onOpenBtnClick} 
            onCheckBtnClick={this.onCheckBtnClick}/>
        }
        {isModalOpen && <Modal
          className="save-modal"
          header="Do you want to add the product to cart?"
          text="This product will be saved in your cart"
          closeButton={true}
          actions={
            <Button
              text="Ok"
              backgroundColor="#4CAF50" />
          }
          onClick={this.closeModal}/>
        }
      </>
    );
  }
}

export default App;
