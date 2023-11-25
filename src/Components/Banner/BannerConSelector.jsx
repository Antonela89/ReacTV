import React, { useState, useEffect } from "react";
import { getPopularMovies, getMovieById } from "../../services/tmdbService";
import YouTube from "react-youtube";
import Carrusel from "../Carrusel/Carrusel";
import "./Banner.css";

const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;

function BannerConSelector() {
  const [showCardContainer, setShowCardContainer] = useState(true);
  // const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async () => {
    try {
      const moviesData = await getPopularMovies(1);
      setMovies(moviesData);
      setMovie(moviesData[0]);
    } catch (error) {
      console.error(`Error al obtener las peliculas: ${error.message}`);
    }
  };

  const fetchMovie = async (id) => {
    try {
      const movieData = await getMovieById(1, id);

      // if (movieData.videos && movieData.videos.results) {
      //   const trailer = movieData.videos.results.find(
      //     (vid) => vid.name === "Official Trailer"
      //   );
      //   setTrailer(trailer ? trailer : movieData.videos.results[0]);
      // }

      setMovie(movieData);
      console.log(movieData);
    } catch (error) {
      console.error(`Error fetching movie details: ${error.message}`);
    }
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    // setSelectedMovie(movie);
    setShowCardContainer(false);
    window.scrollTo(0, 0);
  };

  const closeBanner = () => {
    setPlaying(false); // Aseguramos que el reproductor de video esté cerrado
    setShowCardContainer(true); // Mostramos el contenedor de tarjetas
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const CardContainer = () => {
    return (
      <div>
        <Carrusel peliculas={movies} selectMovie={selectMovie} />
      </div>
    );
  };

  console.log(movie);

  return (
    <>
      {showCardContainer ? (
        <CardContainer />
      ) : (
        <div>
          <div style={{ margin: "1rem" }}>
            <main>
              <div
                className="viewtrailer"
                style={{
                  objectFit: "containt",
                  backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                  width: "100%",
                  height: "100%",
                }}
              >
                {playing ? (
                  <div className="youtube-container">
                    <YouTube
                      className="reproductor"
                      videoId={trailer.key}
                      opts={{
                        playerVars: {
                          autoplay: 1,
                          controls: 1,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button onClick={() => setPlaying(false)} className="boton">
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="container">
                    <div className="">
                      {trailer ? (
                        <div>
                          <button
                            className="boton"
                            onClick={() => setPlaying(true)}
                            type="button"
                          >
                            Play Trailer
                          </button>
                          <button
                            className="boton"
                            onClick={closeBanner}
                            type="button"
                          >
                            Volver al Listado
                          </button>
                        </div>
                      ) : (
                        "Lo sentimos, el trailer no esta disponible"
                      )}
                      <h1 className="text-white">{movie.title}</h1>
                      <p className="text-white">{movie.overview}</p>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default BannerConSelector;