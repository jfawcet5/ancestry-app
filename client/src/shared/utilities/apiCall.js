import { useAuthentication } from "../../features/security/authContext";

const API_TARGET = process.env.REACT_APP_API_URL;

export function useApi() {
    console.log("Use API Setup");
    const { user } = useAuthentication();
    console.log(user);

    function apiCall(endpoint, options = {}) {
        const apiBase = user ? "/api" : "/api/demo";
        const apiURL = `${API_TARGET}${apiBase}${endpoint}`

        console.log(`Requesting: ${apiURL}`);

        return fetch(apiURL, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "applicatin/json",
                ...options.headers
            }
        });
    }

    return apiCall;
}