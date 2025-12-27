import { useState } from "react";

const ENDPOINT = process.env.REACT_APP_API_URL;

function GenerateCodeVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);

    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, "-")
        .replace(/\//g, "-")
        .replace(/=+$/, "");
}

function GetVerifierHash() {
    const codeVerifier = GenerateCodeVerifier();
    sessionStorage.setItem("pkce_verifier", codeVerifier);

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = crypto.subtle.digest("SHA-256", data);
    return hash;
}


export default function RegisterPage() {
    const [invite, setInvite] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const verifierHash = GetVerifierHash();

        verifierHash.then(h => {
            const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(h)))
            .replace(/\+/g, "-")
            .replace(/\//g, "-")
            .replace(/=+$/, "");
        
            const state = btoa(JSON.stringify({
                flow: "signup",
                redirect: "/",
                invite
            }));

            const params = new URLSearchParams({
                response_type: "code",
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                redirect_uri: window.location.origin + "/",
                scope: "openid profile email",
                screen_hint: "signup",
                code_challenge: codeChallenge,
                code_challenge_method: "S256",
                state
            });

            const req = fetch(`${ENDPOINT}/api/auth/preregister`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({invite})
            })

            req.then(res => res.json()).then(data => {
                const { signupSessionId } = data;
                console.log(`Sign up Session ID: ${signupSessionId}`);

                sessionStorage.setItem("authFlow", JSON.stringify({
                    type: "signup",
                    sessionId: signupSessionId
                }));
            })

            window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?${params}`;
        })
    }

    return (
        <form onSubmit={handleLogin}>
            <br />
            <label>invite code</label>
            <input value={invite} onChange={e => setInvite(e.target.value)} />
            <button>Register</button>
            <br />
            <p>Note: You will be taken to a secure sign up page</p>
        </form>
    );
}