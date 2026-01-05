import { useCallback } from "react";

import { useAuthentication } from "../../features/security/authContext";
import { useLoader } from "../../features/async/loaderContext";

const API_TARGET = process.env.REACT_APP_API_URL;

export function useApi() {
    console.log("Use API Setup");
    const { user, token } = useAuthentication();
    //const { setLoading } = useLoader();
    const { executeWithLoader } = useLoader();
    console.log(user);

    const apiCall = useCallback((endpoint, options = {}) => {
        const apiBase = user ? "/api" : "/api/demo";
        const apiURL = `${API_TARGET}${apiBase}${endpoint}`

        console.log("API URL: ", API_TARGET);
        console.log(`Requesting: ${apiURL}`);

        const apiOperation = () => fetch(apiURL, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                ...options.headers
            }
        });

        return executeWithLoader(apiOperation, "Retrieving data", "This may take a few minutes");
    }, [user, token, executeWithLoader]);

    return apiCall;
}

/*
export function useApi() {
    console.log("Use API Setup");
    const { user, token } = useAuthentication();
    const { setLoading } = useLoader();
    console.log(user);

    const apiCall = useCallback((endpoint, options = {}) => {
        const apiBase = user ? "/api" : "/api/demo";
        const apiURL = `${API_TARGET}${apiBase}${endpoint}`

        console.log("API URL: ", API_TARGET);
        console.log(`Requesting: ${apiURL}`);

        let loaderStartTime = 0;

        const loaderDelay = setTimeout(() => {
            setLoading(true);
            loaderStartTime = Date.now();
        }, LOADER_DELAY);

        setLoading(true);

        const apiPromise = fetch(apiURL, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                ...options.headers
            }
        })
        .then(result => {
            clearTimeout(loaderDelay);
            const elapsedTime = Date.now() - loaderStartTime;
            console.log("Elapsed: ", elapsedTime);
            const remaining = Math.max(0, MIN_LOADER_DISPLAY - elapsedTime);
            
            setTimeout(() => {
                setLoading(false);
            }, remaining);

            return result;
        });

        return apiPromise;
    }, [user, token]);

    return apiCall;
}
*/