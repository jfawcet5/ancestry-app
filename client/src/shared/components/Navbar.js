import { Link } from 'react-router-dom';
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navContainer}>
            <h1><Link to="/">App</Link></h1>
            <ul className={styles.navLinks}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/treeview">Tree</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;