import { useState } from "react";
import { useAuthentication } from "../features/security/authContext";

const ENDPOINT = process.env.REACT_APP_API_URL;

export default function RegisterPage() {
    const { setUser } = useAuthentication();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [invite, setInvite] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        fetch(`${ENDPOINT}/api/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password, username, invite})
        })
        .then(res => {
            console.log("received a response");
            console.log(res);
            if (!res.ok) {
                return null;
            }

            return res.json();
        })
        .then(jsonData => {
            console.log(jsonData);
            setUser(jsonData);
        })
        .catch(error => {
            console.log("Failed to make api call");
        })
    }

    return (
        <form onSubmit={handleLogin}>
            <label>email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <label>username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <label>invite code</label>
            <input value={invite} onChange={e => setInvite(e.target.value)} />
            <label>password</label>
            <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    );
}