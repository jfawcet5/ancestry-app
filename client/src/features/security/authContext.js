import { createContext, useContext, useEffect, useState } from "react";

const ENDPOINT = process.env.REACT_APP_API_URL;

const AuthenticationContext = createContext(null);

export function AuthenticationProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ENDPOINT}/api/auth/me`, {
            credentials: "include"
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
            console.log("Authentication");
            console.log(jsonData);
            setUser(jsonData);
            setLoading(false);
        })
        .catch(error => {
            console.log("failed to initialize authentication");
            setUser(null);
            setLoading(false);
        })
    }, []);

    return (
        <AuthenticationContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    return useContext(AuthenticationContext);
}