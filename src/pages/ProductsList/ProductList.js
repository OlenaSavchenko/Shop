import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { getGoods, isError, isModalOpen } from "../../store/products/selectors";
import ProductCard from '../../components/ProductCard/ProductCard';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import Error from '../Error/Error';
import './ProductList.scss'

const ProductsList = ({ onAddClick, onConfirmAddClick }) => {
  const modalOpen = useSelector(isModalOpen)
  const products = useSelector(getGoods)
  const error = useSelector(isError)

  return (
    <>
      {error
        ? <Error />
        : <ul className="products-list">
          {products.map(item => {
            return (
              <ProductCard key={item.id}
                product={item}
                onAddClick={onAddClick}
              />
            )
          })}
        </ul>}
      {modalOpen && <Modal
        className="save-modal"
        header="Do you want to add the product to cart?"
        actions={
          <Button
            type="button" text="Ok" backgroundColor="#4CAF50"
            onClick={onConfirmAddClick}
          />
        } />
      }
    </>
  )
}

ProductsList.propTypes = {
  onAddClick: PropTypes.func,
  onConfirmAddClick: PropTypes.func,
}

ProductsList.defaultProps = {
  onAddClick: () => { },
  onConfirmAddClick: () => { },
}

export default ProductsList