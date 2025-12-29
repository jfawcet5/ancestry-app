import { Link } from 'react-router-dom';
import styles from "./Navbar.module.css";

import { useAuthentication } from '../../features/security/authContext';
import { usePermissions } from '../../features/security/usePermissions';
/*
function GenerateCodeVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);

    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, "-")
        .replace(/\//g, "-")
        .replace(/=+$/, "");
}

function LoginButton() {
    const codeVerifier = GenerateCodeVerifier();
    sessionStorage.setItem("pkce_verifier", codeVerifier);

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = crypto.subtle.digest("SHA-256", data);
    hash.then(h => {
        const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(h)))
            .replace(/\+/g, "-")
            .replace(/\//g, "-")
            .replace(/=+$/, "");
        
        const state = btoa(JSON.stringify({
            flow: "login",
            redirect: "/"
        }));

        const params = new URLSearchParams({
            response_type: "code",
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirect_uri: window.location.origin + "/",
            scope: "openid profile email",
            screen_hint: "login",
            code_challenge: codeChallenge,
            code_challenge_method: "S256",
            state
        });

        sessionStorage.setItem("authFlow", JSON.stringify({
            type: "login"
        }));

        window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?${params}`;
    })
}

function RegisterButton() {
    const codeVerifier = GenerateCodeVerifier();
    sessionStorage.setItem("pkce_verifier", codeVerifier);

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = crypto.subtle.digest("SHA-256", data);
    hash.then(h => {
        const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(h)))
            .replace(/\+/g, "-")
            .replace(/\//g, "-")
            .replace(/=+$/, "");
        
        const state = btoa(JSON.stringify({
            flow: "login",
            redirect: "/"
        }));

        const params = new URLSearchParams({
            response_type: "code",
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirect_uri: window.location.origin + "/",
            screen_hint: "signup",
            scope: "openid profile email",
            code_challenge: codeChallenge,
            code_challenge_method: "S256",
            state
        });

        window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?${params}`;
    })
}
*/


const Navbar = () => {
    const { user } = useAuthentication();
    const permissions = usePermissions();

    return (
        <nav className={styles.navContainer}>
            <h1><Link to="/">App</Link></h1>
            <ul className={styles.navLinks}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                {permissions.canCreate && <li><Link to="/create">Create</Link></li>}
                <li><Link to="/treeview">Tree</Link></li>
                <li><Link to="/login">{user ? "Logout" : "Login"}</Link></li>
                {!user && <li><Link to="/register">Register</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;