import { createContext, useContext, useState, useEffect } from "react";

const MediaTypeContext = createContext();

export const MediaTypeProvider = ({ children }) => {
    // Intenta cargar el estado desde localStorage, o usa 'movie' como valor por defecto
    const savedMediaType = localStorage.getItem("mediaType");
    const [mediaType, setMediaType] = useState(savedMediaType || "movie");

    const changeMediaType = (newType) => {
        setMediaType(newType);
    };

    // Guarda el estado en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem("mediaType", mediaType);
    }, [mediaType]);

    return (
        <MediaTypeContext.Provider value={{ mediaType, changeMediaType }}>
            {children}
        </MediaTypeContext.Provider>
    );
};

export const useMediaType = () => {
    const context = useContext(MediaTypeContext);
    if (!context) {
        throw new Error(
            "useMediaType debe ser utilizado dentro de un MediaTypeProvider"
        );
    }
    return context;
};
