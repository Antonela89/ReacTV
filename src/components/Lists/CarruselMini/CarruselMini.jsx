import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./CarruselMini.css";
import Card from "./Card/Card";

function calculateNewHeight(originalWidth, originalHeight, newWidth) {
  // Calcula la nueva altura manteniendo la proporción original
  var ratio = newWidth / originalWidth;
  var newHeight = ratio * originalHeight;

  return newHeight;
}

/**
 * Componente que renderiza una lista de películas con flechas de navegación horizontal.
 *
 * @param {Object} props - Mis propiedades.
 * @param {string} props.title - Título de la lista de películas.
 * @param {Object} props.items - Objeto con la información de las películas.
 * @returns {JSX.Element} Elemento JSX que representa la lista de películas.
 */
const MovieList = ({ title, items, onCardClick, cardWidth = 150 }) => {
  const itemOriginalWidth = 150;
  const itemOriginalHeight = 225;
  const itemWidth = cardWidth;

  /**************************************/
  /********** Arrow and Clicks **********/
  /**************************************/

  // Estado local para el desplazamiento horizontal de la lista.
  const [scrollX, setScrollX] = useState(0);

  /**
   * Manejo del evento clic de la flecha izquierda, ajustando el desplazamiento.
   */
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    // Ajusto el desplazamiento a 0 si se excede el límite izquierdo.
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  /**
   * Manejo del evento clic de la flecha derecha, ajustando el desplazamiento.
   */
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.length * itemWidth;
    // Ajusto el desplazamiento para que no se vaya más allá del final de la lista.
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 80;
    }
    setScrollX(x);
  };

  /***************************/
  /********** Touch **********/
  /***************************/
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const touchMoveX = e.touches[0].clientX;
    const deltaX = touchMoveX - touchStartX;

    // Desplazo hacia la izquierda en una cantidad equivalente al gesto táctil.
    // Ajusto el desplazamiento a 0 si se excede el límite izquierdo.
    if (deltaX > 0) {
      let x = scrollX + Math.round(deltaX);
      if (x > 0) {
        x = 0;
      }
      setScrollX(x);
    }
    // Desplazo hacia la derecha en una cantidad equivalente al gesto táctil.
    // Limito el desplazamiento para que no se vaya más allá del final de la lista.
    else {
      let x = scrollX - Math.round(Math.abs(deltaX));
      const listW = items.length * itemWidth;
      if (window.innerWidth - listW > x) {
        x = window.innerWidth - listW - 80;
      }
      setScrollX(x);
    }

    setTouchStartX(touchMoveX);
  };

  // Renderizo la lista de películas.
  return (
    <div
      className="movieList"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {title ? <h2>{title}</h2> : null}
      {/* Flecha izquierda para desplazarse hacia la izquierda */}
      <div
        className="movieList--Arrow-Left"
        style={{
          height: `${calculateNewHeight(
            itemOriginalWidth,
            itemOriginalHeight,
            itemWidth,
          )}px`,
        }}
        onClick={handleLeftArrow}
      >
        <ChevronLeftIcon style={{ fontSize: 50, color: "white" }} />
      </div>
      {/* Flecha derecha para desplazarse hacia la derecha */}
      <div
        className="movieList--Arrow-Right"
        style={{
          height: `${calculateNewHeight(
            itemOriginalWidth,
            itemOriginalHeight,
            itemWidth,
          )}px`,
        }}
        onClick={handleRightArrow}
      >
        <ChevronRightIcon style={{ fontSize: 50, color: "white" }} />
      </div>
      {/* Contenedor de la lista de películas */}
      <div className="movieList--container">
        {/* Lista de películas */}
        <div
          className="movieList--list"
          style={{ marginLeft: scrollX, width: items.length * itemWidth }}
        >
          {items.length > 0 &&
            // Mapeo de cada película para su visualización en la lista
            items.map((item, key) => (
              <div
                key={key}
                className="movieList--item"
                style={{ width: `${itemWidth}px` }}
              >
                <div style={{ width: `${itemWidth}px` }}>
                  <Card data={item} onClick={() => onCardClick(item)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
