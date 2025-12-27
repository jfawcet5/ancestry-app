import { createContext, useContext, useState } from "react";

const AuthenticationContext = createContext(null);

export function AuthenticationProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <AuthenticationContext.Provider value={{user, setUser, token, setToken, loading, setLoading}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    return useContext(AuthenticationContext);
}