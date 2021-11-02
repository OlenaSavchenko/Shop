import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { getGoods, isInCart, isModalOpen } from "../../store/products/selectors";
import ProductCard from '../../components/ProductCard/ProductCard.js';
import Modal from '../../components/Modal/Modal.js';
import Button from '../../components/Button/Button.js';
import OrderForm from "../../components/OrderForm/OrderForm";
import "./Cart.scss"

const Cart = ({ onRemoveClick, onConfirmRemoveClick }) => {
    const inCart = useSelector(isInCart)
    const products = useSelector(getGoods)
    const modalOpen = useSelector(isModalOpen)
    const itemsInCart = products.filter(product => inCart.includes(product.id));


    return (
        <>
            {itemsInCart.length
                ? <div className="cart-wrapper">
                    <OrderForm itemsInCart={itemsInCart} />
                    <div>
                        <p style={{ marginLeft: "30px" }}>{`${itemsInCart.length} product(s) in cart`}</p>
                        <ul className="products-list cart-list">
                            {itemsInCart.map(item => {
                                return (
                                    <ProductCard key={item.id}
                                        product={item}
                                        onRemoveClick={onRemoveClick}
                                        status="inCart"
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </div>
                : <p style={{ marginLeft: "30px" }}>Your cart is empty</p>}
            {modalOpen && <Modal
                className="delete-modal"
                header="Do you want to delete this product from cart?"
                actions={
                    <Button
                        type="button" text="Ok"
                        backgroundColor="#b93b3b"
                        className="delete-modal__btn delete-modal__btn--approve"
                        onClick={onConfirmRemoveClick} />
                } />
            }
        </>
    )
}

Cart.propTypes = {
    onRemoveClick: PropTypes.func,
    onConfirmRemoveClick: PropTypes.func
}

Cart.defaultProps = {
    onRemoveClick: () => { },
    onConfirmRemoveClick: () => { }
}

export default Cart