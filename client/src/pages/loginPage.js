import { useAuthentication } from "../features/security/authContext";

//const ENDPOINT = process.env.REACT_APP_API_URL;

function GenerateCodeVerifier() {
    const array = new Uint8Array(56);
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
    const hash = window.crypto.subtle.digest("SHA-256", data);
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
            redirect_uri: window.location.origin + process.env.REACT_APP_PUBLIC_URL,
            scope: "openid profile email",
            screen_hint: "login",
            code_challenge: codeChallenge,
            code_challenge_method: "S256",
            state
        });

        sessionStorage.setItem("authFlow", JSON.stringify({
            type: "login"
        }));

        console.log("Before Redirect");
        console.log("verifier: ", codeVerifier);
        console.log("redirect: ", window.location.origin + process.env.REACT_APP_PUBLIC_URL);
        console.log("client id: ", process.env.REACT_APP_AUTH0_CLIENT_ID);

        window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?${params}`;
    })
}


function LogoutButton() {
    const params = new URLSearchParams({
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        returnTo: window.location.origin + process.env.REACT_APP_PUBLIC_URL,
    });

    console.log("returnTo", window.location.origin + process.env.REACT_APP_PUBLIC_URL);

    window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?${params}`;
}


export default function LoginPage() {
    //const { setUser } = useAuthentication();
    const { setUser } = useAuthentication();

    const handleLogout = (e) => {
        setUser(null);
        LogoutButton();
    }

    /*
    const handleLogout = (e) => {
        fetch(`${ENDPOINT}/api/auth/logout`, {
            method: "POST",
            credentials: "include"
        })
        .then(response => {
            setUser(null);
        })
        .catch(error => {
            console.log("failed to make api call");
        })
    }
    */

    return (
        <div>
            <form>
                <br />
                <button onClick={LoginButton}>Login</button>
                <p>Note: You will be taken to a secure login page</p>
            </form>
            <br /><br />
            <button onClick={handleLogout}>Logout</button>
        </div>

    );
}