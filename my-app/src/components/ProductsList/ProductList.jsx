import React, { Component } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import PropTypes from 'prop-types';
import './ProductList.scss'

export default class ProductsList extends Component {
  render() {
    const { products, onClick, onCheckBtnClick } = this.props
    return (
      <>
        <h2 className="products-title">List of products</h2>
        <ul className="products-list">
          {products.map(({ id, ...item }) => {
            return (
              <li key={id} className="products-item">
                <ProductCard
                  product={item}
                  onClick={onClick}
                  onCheckBtnClick={onCheckBtnClick} />
              </li>
            )
          })}
        </ul>
      </>
    )
  }
}

ProductsList.propTypes = {
  products: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  onCheckBtnClick: PropTypes.func
}

ProductsList.defaultProps = {
  onClick: () => { },
  onCheckBtnClick: () => { }
}
