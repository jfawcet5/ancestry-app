import { useCallback } from "react";

import { useAuthentication } from "../../features/security/authContext";

const API_TARGET = process.env.REACT_APP_API_URL;

export function useApi() {
    console.log("Use API Setup");
    const { user, token } = useAuthentication();
    console.log(user);

    const apiCall = useCallback((endpoint, options = {}) => {
        const apiBase = user ? "/api" : "/api/demo";
        const apiURL = `${API_TARGET}${apiBase}${endpoint}`

        console.log("API URL: ", API_TARGET);
        console.log(`Requesting: ${apiURL}`);

        return fetch(apiURL, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "applicatin/json",
                "Authorization": `Bearer ${token}`,
                ...options.headers
            }
        });
    }, [user, token]);

    return apiCall;
}