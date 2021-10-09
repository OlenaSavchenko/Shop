import React, { Component } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import PropTypes from 'prop-types';
import './ProductList.scss'

export default class ProductsList extends Component {
  render() {
    const { products, onClick, onCheckBtnClick, favouritesProducts } = this.props
    return (
      <>
        <h2 className="products-title">List of products</h2>
        <ul className="products-list">
          {products.map(item => {
            return (
                <ProductCard key={item.id}
                  product={item}
                  onClick={onClick} 
                  onCheckBtnClick={onCheckBtnClick} 
                  favourites={favouritesProducts}/>
            )
          })}
        </ul>
      </>
    )
  }
}


ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onCheckBtnClick: PropTypes.func,
  favourites: PropTypes.array,
}

ProductsList.defaultProps = {
  onClick: () => { },
  onCheckBtnClick: () => { },
  favourites:[]
}
