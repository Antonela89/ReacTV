import { useEffect, useState } from "react";
import ListRow from "./ListRow";
// import MediaSelector from "../MediaSelector/MediaSelector";
import Titulo from '../Titulo/Titulo'
import { useMediaType } from "../../context/mediaTypeProvider";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getMoviesByGenres,
  getPopularTV,
  getTopRatedTV,
  getTVByGenres,
} from "../../services/tmdbService";

const ListByCategories = () => {
  const { mediaType } = useMediaType();
  const [moviesComponent, setMoviesComponent] = useState(null);
  const [tvComponent, setTVComponent] = useState(null);

  useEffect(() => {
    if (mediaType === "movie" || mediaType === "all") {
      setMoviesComponent(
        <>
          <Titulo texto={'Peliculas'}/>
          <ListRow
            title="Populares"
            fetchDataFunction={getPopularMovies}
            page={1}
          />
          <ListRow
            title="En Cartelera"
            fetchDataFunction={getNowPlayingMovies}
            page={1}
          />
          <ListRow
            title="Mejores Calificadas"
            fetchDataFunction={getTopRatedMovies}
            page={1}
          />
          <ListRow
            title="En Tendencia"
            fetchDataFunction={getTrendingMovies}
            page={1}
          />
          <ListRow
            title="Acción"
            fetchDataFunction={getMoviesByGenres}
            page={1}
            genre={28}
          />
          <ListRow
            title="Comedia"
            fetchDataFunction={getMoviesByGenres}
            page={1}
            genre={35}
          />
        </>
      );
    } else {
      setMoviesComponent(null);
    }

    if (mediaType === "tv" || mediaType === "all") {
      setTVComponent(
        <>
          <Titulo texto={'Series'}/>
          <ListRow
            title="Populares"
            fetchDataFunction={getPopularTV}
            page={1}
          />
          <ListRow
            title="Mejores Calificadas"
            fetchDataFunction={getTopRatedTV}
            page={1}
          />
          <ListRow
            title="Animación"
            fetchDataFunction={getTVByGenres}
            page={1}
            genre={16}
          />
          <ListRow
            title="Comedia"
            fetchDataFunction={getTVByGenres}
            page={1}
            genre={35}
          />
        </>
      );
    } else {
      setTVComponent(null);
    }
  }, [mediaType]);

  return (
    <div>
      {moviesComponent}
      {tvComponent}
    </div>
  );
};

export default ListByCategories;
