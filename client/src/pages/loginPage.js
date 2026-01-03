import { useAuthentication } from "../features/security/authContext";

//const ENDPOINT = process.env.REACT_APP_API_URL;
import { GenerateCodeVerifier, CreateCodeChallenge } from "../features/security/encoding.js";

function LoginButton() {
    console.log("Login button");
    const codeVerifier = GenerateCodeVerifier();
    sessionStorage.setItem("pkce_verifier", codeVerifier);
    //console.log("Code Verifier: ", codeVerifier);

    const challengePromise = CreateCodeChallenge(codeVerifier);
    challengePromise.then(challenge => {
        
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
            prompt: "login",
            code_challenge: challenge,
            code_challenge_method: "S256",
            state
        });

        sessionStorage.setItem("authFlow", JSON.stringify({
            type: "login"
        }));

        //console.log("Redirect");
        //console.log("verifier: ", codeVerifier);
        //console.log("redirect: ", window.location.origin + process.env.REACT_APP_PUBLIC_URL);
        //console.log("client id: ", process.env.REACT_APP_AUTH0_CLIENT_ID);

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
    const { user, setUser } = useAuthentication();

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
                {!user && (
                    <>
                        <button onClick={LoginButton}>Login</button>
                        <p>Note: You will be taken to a secure login page</p>
                    </>
                )}
            </form>
            {user && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
}