import { NavLink } from "react-router-dom";
import "./Nav.scss"

const Nav = () => {
    return (
        <ul className="nav-list">
            <li className="nav-item"><NavLink className="nav-link" activeClassName="nav-link--active" to="/home">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="nav-link--active" to="/cart">Cart</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="nav-link--active" to="/favourites">Favourites</NavLink></li>
        </ul>
    )
}

export default Nav