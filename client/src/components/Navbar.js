import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>App</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/details">Details</Link></li>
                <li><Link to="/create">Create</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;