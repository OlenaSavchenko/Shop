import { NavLink } from "react-router-dom";
import "./Nav.scss"

const Nav = () => {
    const routes = [{ id: 1, name: 'Home', route: '/home' }, { id: 2, name: 'Cart', route: '/cart' }, { id: 3, name: 'Favourites', route: '/favourites' }]
    return (
        <ul className="nav-list">
            {routes.map((link) => <li key={link.id} className="nav-item"><NavLink className="nav-link" activeClassName="nav-link--active" to={link.route}>{link.name}</NavLink></li>)}
        </ul>
    )
}

export default Nav