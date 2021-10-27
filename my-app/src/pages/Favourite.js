import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { getGoods, isFavourite, isModalOpen } from "../store/products/selectors";
import ProductCard from '../components/ProductCard/ProductCard.js';
import Modal from '../components/Modal/Modal.js';
import Button from '../components/Button/Button.js';

const Favourites = ({ onAddClick, onConfirmAddClick }) => {
    const products = useSelector(getGoods)
    const favourites = useSelector(isFavourite)
    const modalOpen = useSelector(isModalOpen)
    const favouritesItems = products.filter(product => favourites.includes(product.id));

    return (
        <>
            {favouritesItems.length
                ? <>
                    <p style={{ marginLeft: "30px" }}>{`${favouritesItems.length} favourite product(s)`}</p>
                    <ul className="products-list">
                        {favouritesItems.map(item => {
                            return (
                                <ProductCard key={item.id}
                                    product={item}
                                    favourites={favouritesItems}
                                    onAddClick={onAddClick}
                                    status="favourite"
                                />
                            )
                        })}
                    </ul>
                </>
                : <p style={{ marginLeft: "30px" }}>List of favourite products is empty</p>}
            {modalOpen && <Modal
                className="save-modal"
                header="Do you want to add the product to cart?"
                actions={
                    <Button
                        type="button" text="Ok"
                        backgroundColor="#4CAF50"
                        onClick={onConfirmAddClick}
                    />
                } />
            }
        </>
    )
}

Favourites.propTypes = {
    onAddClick: PropTypes.func,
    onConfirmAddClick: PropTypes.func,
}

Favourites.defaultProps = {
    onAddClick: () => { },
    onConfirmAddClick: () => { }
}

export default Favourites