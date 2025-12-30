import { useState } from "react";
import { GenerateCodeVerifier, CreateCodeChallenge } from "../features/security/encoding.js";

const ENDPOINT = process.env.REACT_APP_API_URL;

export default function RegisterPage() {
    const [invite, setInvite] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("register new user");
        const codeVerifier = GenerateCodeVerifier();
        sessionStorage.setItem("pkce_verifier", codeVerifier);
        console.log("Code Verifier: ", codeVerifier);
    
        const challengePromise = CreateCodeChallenge(codeVerifier);
        challengePromise.then(challenge => {
        
            const state = btoa(JSON.stringify({
                flow: "signup",
                redirect: "/",
                invite
            }));

            const params = new URLSearchParams({
                response_type: "code",
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                redirect_uri: window.location.origin + process.env.REACT_APP_PUBLIC_URL,
                scope: "openid profile email",
                screen_hint: "signup",
                code_challenge: challenge,
                code_challenge_method: "S256",
                state
            });

            console.log("Send pre register call to backend");
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

                window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?${params}`;
            })
            .catch(error => {
                console.log("Pre register failed");
                console.log(error.message);
                return;
            })
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