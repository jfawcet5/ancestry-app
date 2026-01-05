import { createContext, useContext, useState } from "react";

const AuthenticationContext = createContext(null);

export function AuthenticationProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    return (
        <AuthenticationContext.Provider value={{user, setUser, token, setToken}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    return useContext(AuthenticationContext);
}