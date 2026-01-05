import { useMemo, useState } from "react";
import { LoaderContext } from "./loaderContext";
import { createLoader } from "./loader";
import PopupModal from "../../shared/components/PopupModal";

export default function LoaderProvider({ children }) {
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState("");

    const executeWithLoader = useMemo(
        () => createLoader(setLoading, setTitle, setMessage),
        []
    );

    return (
        <LoaderContext.Provider value={{ executeWithLoader }}>
            {children}
            {isLoading &&
                <PopupModal label={title ?? "Loading..."} isOpen={true} size="narrow">
                    <p>{message}</p>
                    <br />
                    <div className="loader-spinner"/>
                </PopupModal> 
            }
        </LoaderContext.Provider>
    )
}