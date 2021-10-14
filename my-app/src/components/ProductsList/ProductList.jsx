import ProductCard from '../ProductCard/ProductCard';
import PropTypes from 'prop-types';
import './ProductList.scss'

const ProductsList = (props) => {
  const { products, onAddBtnClick, onSelectBtnClick, onDeleteBtnClick, favourites, inCart } = props
  return (
      <ul className="products-list">
        {products.map(item => {
          return (
            <ProductCard key={item.id}
              product={item}
              onAddBtnClick={onAddBtnClick}
              onSelectBtnClick={onSelectBtnClick}
              favourites={favourites}
              inCart = {inCart}
              onDeleteBtnClick={onDeleteBtnClick}
            />
          )
        })}
      </ul>

  )
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
  favourites: []
}

export default ProductsList