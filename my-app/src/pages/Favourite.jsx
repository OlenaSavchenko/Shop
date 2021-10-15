import ProductCard from '../components/ProductCard/ProductCard.jsx';
import PropTypes from 'prop-types';

const Favourites = (props) => {
    const { products, favourites, onSelectBtnClick, onAddBtnClick } = props
    const favouritesItems = products.filter(product => favourites.includes(product.id));
    return (
        (favouritesItems.length > 0)
            ? <>
                <p style={{ marginLeft: "30px" }}>{`${favouritesItems.length} favourite product(s)`}</p>
                <ul className="products-list">
                    {favouritesItems.map(item => {
                        return (
                            <ProductCard key={item.id}
                                product={item}
                                onSelectBtnClick={onSelectBtnClick}
                                favourites={favouritesItems}
                                onAddBtnClick={onAddBtnClick}
                                status="favourite"
                            />
                        )
                    })}
                </ul>
            </>
            : <p style={{ marginLeft: "30px" }}>List of favourite products is empty</p>
    )
}

Favourites.propTypes = {
    products: PropTypes.array.isRequired,
    onAddBtnClick: PropTypes.func,
    onSelectBtnClick: PropTypes.func,
    favourites: PropTypes.array,
}

Favourites.defaultProps = {
    onAddBtnClick: () => { },
    onSelectBtnClick: () => { },
    favourites: []
}

export default Favourites