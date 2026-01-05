import { useState, useCallback, useEffect } from "react";
import { NotificationContext } from "./notificationContext";
import PopupModal from "../../shared/components/PopupModal";

export default function NotificationProvider({ children }) {
    const [error, setError] = useState(null);

    const showError = useCallback(({title, message}) => {
        sessionStorage.setItem(
            "AppError",
            JSON.stringify({
                title,
                message
            })
        );
        setError({title, message});
    }, []);

    const clearError = useCallback(() => {
        setError(null);
        sessionStorage.removeItem("AppError");
    }, []);

    // Support rehydration as some errors need to persist through redirects
    useEffect(() => {
        const rawError = sessionStorage.getItem("AppError");

        if (rawError) {
            showError(JSON.parse(rawError));
        }
    }, [showError]);

    return (
        <NotificationContext.Provider value={{ showError }}>
            {children}
            {error &&
                <PopupModal label={error.title} isOpen={true} size="narrow" onClose={clearError}>
                    <p>{error.message}</p>
                </PopupModal> 
            }
        </NotificationContext.Provider>
    )
}