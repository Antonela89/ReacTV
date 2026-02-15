import { useState, useEffect } from "react";
import { useMediaType } from "../../context/mediaTypeProvider";
import MediaSelector from "../MediaSelector/MediaSelector";
import List from "../Lists/ListRow";
import {
  getGenres,
  getMoviesByGenres,
  getTVByGenres,
  getAllByGenres,
} from "../../services/tmdbService";
import Titulo from "../Titulo/Titulo";
import BotonGenero from "../Boton/BotonGenero/BotonGenero";

const FilterByGenres = () => {
  const [genres, setGenres] = useState([]);
  const { mediaType } = useMediaType();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchDataFunction = {
    movie: getMoviesByGenres,
    tv: getTVByGenres,
    all: getAllByGenres,
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenres(mediaType);
        setGenres(genresData[0]?.items || []);
      } catch (error) {
        console.error(`Error al obtener los géneros: ${error.message}`);
      }
    };

    fetchGenres();

    // Reinicia la lista de géneros seleccionados y el estado de selección en BotonGenero
    setSelectedGenres([]);
  }, [mediaType]);

  const handleGenreClick = (genreId) => {
    const selectedGenre = genres.find((genre) => genre.id === genreId);

    if (selectedGenre) {
      if (selectedGenres.includes(selectedGenre)) {
        setSelectedGenres((prevSelectedGenres) =>
          prevSelectedGenres.filter((genre) => genre.id !== selectedGenre.id),
        );
      } else {
        setSelectedGenres((prevSelectedGenres) => [
          ...prevSelectedGenres,
          selectedGenre,
        ]);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100vw",
      }}
    >
      <MediaSelector />
      <Titulo texto={`Listado de Géneros: ${mediaType}`} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          maxWidth: "100vw",
        }}
      >
        {genres.map((genre) => (
          <BotonGenero
            key={genre.id}
            texto={genre.name}
            onClick={() => handleGenreClick(genre.id)}
            isSelected={selectedGenres.some(
              (selectedGenre) => selectedGenre.id === genre.id,
            )}
          />
        ))}
      </div>

      {/* Sección que muestra los géneros seleccionados */}
      <label style={{fontSize: '1.5rem', marginTop: "2rem"}}>Géneros Seleccionados:</label>
      <div style={{ marginTop: "2rem" }}>
        {selectedGenres.map((selectedGenre, index) => (
          <div key={selectedGenre.id} style={{ maxWidth: "100vw" }}>
            <List
              title={selectedGenre.name}
              fetchDataFunction={fetchDataFunction[mediaType]}
              genre={selectedGenre.id}
            />
          </div>
        ))}
        {/* Mensaje si no hay géneros seleccionados */}
        {selectedGenres.length === 0 && <p style={{fontSize: '1.5rem'}}>Ninguno seleccionado</p>}
      </div>
    </div>
  );
};

export default FilterByGenres;