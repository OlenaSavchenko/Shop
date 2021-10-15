import ProductCard from '../../components/ProductCard/ProductCard';
import PropTypes from 'prop-types';
import './ProductList.scss'

const ProductsList = (props) => {
  const { products, onAddBtnClick, onSelectBtnClick, favourites } = props
  return (
      <ul className="products-list">
        {products.map(item => {
          return (
            <ProductCard key={item.id}
              product={item}
              onAddBtnClick={onAddBtnClick}
              onSelectBtnClick={onSelectBtnClick}
              favourites={favourites}
            />
          )
        })}
      </ul>

  )
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddBtnClick: PropTypes.func,
  onSelectBtnClick: PropTypes.func,
  favourites: PropTypes.array,
}

ProductsList.defaultProps = {
  onAddBtnClick: () => { },
  onSelectBtnClick: () => { },
  favourites: []
}

export default ProductsList