import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { isFavourite } from "../../store/products/selectors";
import { setFavouritesThunk as setFavourites } from "../../store/products/operations"
import Button from "../Button/Button";
import CloseButtonIcon from "../icons/CloseButtonIcon";
import CartButtonIcon from "../icons/CartButtonIcon";
import FavouriteButtonIcon from "../icons/FavouriteButtonIcon";
import "./ProductCard.scss";

const ProductCard = ({ product, onAddClick, onRemoveClick, status }) => {
  const { name, item, color, price, url, id } = product;
  const favourites = useSelector(isFavourite)
  const dispatch = useDispatch()
  const isFavouriteItem = favourites.some(item => item === id)

  const onSelectBtnClick = () => {
    const favouriteProducts = [...favourites]

    dispatch(setFavourites(id, favouriteProducts))
  };

  return (
    <li className="products-item">
      {status === "inCart"
        ? <Button
          className="products-item__btn"
          text={<CloseButtonIcon />}
          backgroundColor="#b93b3b"
          onClick={() => onRemoveClick(id)}
          type="button"
        />
        : <Button
          className="products-item__btn"
          text={<CartButtonIcon />}
          backgroundColor="#4CAF50"
          onClick={() => onAddClick(id)}
          type="button"
        />
      }

      <div className="products-item__img-box">
        <img
          src={url}
          alt={`${name} ${item}`}
          title={`${name} ${item}`}
          aria-label={`${name} ${item}`}
          className="products-item__img"
        />
      </div>
      <h3>{`${name} ${item}`}</h3>
      <p className="products-item__tag products-item__tag--color">
        Color: {color}
      </p>
      <p className="products-item__tag">Price: {price} UAH</p>
      <FavouriteButtonIcon onSelectBtnClick={onSelectBtnClick}
        fill={isFavouriteItem || status === 'favourite' ? "red" : "currentColor"} />
    </li>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    item: PropTypes.string,
    color: PropTypes.string,
    price: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  status: PropTypes.string,
}

ProductCard.defaultProps = {
  item: "ask information in the shop",
  color: "ask information in the shop",
  url: "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
  status: null,
  onAddClick: () => { },
  onRemoveClick: () => { }
}

export default ProductCard