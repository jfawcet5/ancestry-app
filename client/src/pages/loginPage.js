import { useState } from "react";
import { useAuthentication } from "../features/security/authContext";

const ENDPOINT = process.env.REACT_APP_API_URL;

export default function LoginPage() {
    const { setUser } = useAuthentication();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        fetch(`${ENDPOINT}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })
        .then(response => {
            console.log("requesting me")
            return fetch(`${ENDPOINT}/api/auth/me`, {credentials: "include"})
        })
        .then(response => {
            console.log("recieved a response for me");
            return response.json();
        })
        .then(auth => {
            console.log("auth");
            console.log(auth);
            setUser(auth);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleLogout = (e) => {
        fetch(`${ENDPOINT}/api/auth/logout`, {
            method: "POST",
            credentials: "include"
        })
        .then(response => {
            setUser(null);
        })
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} />
                <label>password</label>
                <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </div>

    );
}