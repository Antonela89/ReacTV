import { useState, useEffect } from "react";
import "./BotonGenero.css";

const BotonGenero = ({ texto, onClick, isSelected }) => {
    const [localSelected, setLocalSelected] = useState(isSelected);

    useEffect(() => {
        setLocalSelected(isSelected);
    }, [isSelected]);

    const handleButtonClick = () => {
        setLocalSelected(!localSelected);
        onClick();
    };

    return (
        <button
            type="submit"
            className={`BotonGenero ${localSelected ? "clicked" : ""}`}
            onClick={handleButtonClick}>
            {texto}
        </button>
    );
};

export default BotonGenero;

