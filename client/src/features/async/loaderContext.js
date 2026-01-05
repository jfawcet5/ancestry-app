import { createContext, useContext } from "react";

export const LoaderContext = createContext(null);

export function useLoader() {
    const ctx = useContext(LoaderContext);
    if (!ctx) {
        throw new Error("Failed to initialize loader");
    }
    return ctx;
}