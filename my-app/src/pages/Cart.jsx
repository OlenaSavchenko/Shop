import ProductCard from '../components/ProductCard/ProductCard.jsx';
import PropTypes from 'prop-types';

const Cart = (props) => {
    const { products, inCart, favourites, onSelectBtnClick, onDeleteBtnClick } = props
    const itemsInCart = products.filter(product => inCart.includes(product.id));
    return (
        (itemsInCart.length > 0)
            ? <>
                <p style={{ marginLeft: "30px" }}>{`${itemsInCart.length} product(s) in cart`}</p>
                <ul className="products-list">
                    {itemsInCart.map(item => {
                        return (
                            <ProductCard key={item.id}
                                product={item}
                                onSelectBtnClick={onSelectBtnClick}
                                favourites={favourites}
                                inCart={itemsInCart}
                                onDeleteBtnClick={onDeleteBtnClick}
                                status="inCart"
                            />
                        )
                    })}
                </ul>
            </>
            : <p style={{ marginLeft: "30px" }}>Your cart is empty</p>
    )
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    onDeleteBtnClick: PropTypes.func,
    onSelectBtnClick: PropTypes.func,
    favourites: PropTypes.array,
    inCart: PropTypes.array
}

Cart.defaultProps = {
    onDeleteBtnClick: () => { },
    onSelectBtnClick: () => { },
    favourites: [],
    inCart: []
}

export default Cart