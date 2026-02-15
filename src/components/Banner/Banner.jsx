import { useState, useEffect } from "react";
import { getMovieById, getPopularMovies, getTrailersById } from "../../services/tmdbService";
import YouTube from "react-youtube";
import CarruselHorizontal from "../Carrusel/CarruselHorizontal/CarruselHorizontal";
import Boton from '../Boton/Boton';
import Loader from '../Loader/Loader';
import Alert from '../Alert/Alert';
import Swal from "sweetalert2";
import { db } from "../../firebase/Firebase";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useAuth } from '../../context/authContext.js';
import "./Banner.css";

const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;

export const TrailerPlayer = ({ trailer, closeBanner }) => {
    return (
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
        <Boton texto={'close'} funcion={closeBanner}/>
    </div>
    );
};

const BannerContent = ({ movie, trailer, setPlaying, closeBanner }) => {

    const [playButtonClicked, setPlayButtonClicked] = useState(false);
    const { user } = useAuth();
    const [userEmail, setUserEmail] = useState(null);

    const handlePlayButtonClick = () => {
        setPlaying(true);
        setPlayButtonClicked(true);
        handleRecent();
    };

    //funcion para agregar a lista o recientes
    const handleListOrRecent = async (route, dataToAdd, querySnapshot) => {
        if (querySnapshot.size === 0) {
            // No hay documentos con el mismo ID: agregarlo
            await addDoc(route, dataToAdd);
            Swal.fire({
                icon: "success",
                title: "Agregado correctamente",
                text: "La película/serie se ha agragado a la lista.",
            });
            console.log('Agregado correctamente');
        } else {
            // Ya existe un documento con el mismo ID
            Swal.fire({
                icon: "info",
                title: "Id repetido",
                text: "Lo siento, La película/serie ya está en la lista.",
            });
        }
    }

    //funcion para agregar a lista
    const handleList = async () => {
        const userEmailValue = user.email;
        setUserEmail(userEmailValue);

        const route = collection(db, `Usuarios/${userEmailValue}/ListaPeliculas`);

        const dataToAdd = {
            id: movie.id,
            nombre: movie.original_title,
        };

        if (movie.original_title) {
            dataToAdd.nombre = movie.original_title;
            await handleListOrRecent(route, dataToAdd, await getDocs(query(route, where("id", "==", movie.id))));
        }
    }

    //funcion para agregar a recientes
    const handleRecent = async () => {
        const userEmailValue = user.email;
        setUserEmail(userEmailValue);

        const route2 = collection(db, `Usuarios/${userEmailValue}/RecentPeliculas`);

        const dataToAdd2 = {
            id: movie.id,
            nombre: movie.original_title
        };

        if (movie.original_title) {
            dataToAdd2.nombre = movie.original_title;
            await handleListOrRecent(route2, dataToAdd2, await getDocs(query(route2, where("id", "==", movie.id))));
        }
    }


    return (
        <div className="container-banner">
            <div className="banner">
            <div className="botones-banner">
                    {trailer ? (
                        <button
                            className="boton-banner"
                            onClick={handlePlayButtonClick}
                            type="button">
                            Play Trailer
                        </button>
                    ) : (
                        <button
                            className="boton-banner"
                            onClick={() => setPlayButtonClicked(true)} // Simula el clic para mostrar el Alert
                            type="button">
                            Play Trailer
                        </button>
                    )}
                    <button
                        className="boton-banner"
                        onClick={() => handleList()}
                        type="button">
                        Agregar a mi lista
                    </button>
                    <button
                        className="boton-banner"
                        onClick={() => closeBanner()}
                        type="button">
                        Volver al Listado
                    </button>

                    {playButtonClicked && !trailer && (
                        <Alert
                            title={'Sin trailer'}
                            text={'Lo sentimos, el trailer no está disponible'}
                            icon={'info'}
                            confirmButtonText={'Aceptar'}
                            cancelButtonText={'Cancelar'}
                        />
                    )}
                </div>
            <h1 className="titulo-banner">{movie.title}</h1>
            <p className="descripcion-banner">{movie.overview}</p>
        </div>
    </div>
    );
};

function Banner() {
    const [showCardContainer, setShowCardContainer] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [actualPage, setActualPage] = useState(0);
    const [movie, setMovie] = useState({ title: "Loading Movies" });
    const [playing, setPlaying] = useState(false);
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);


    const fetchMovies = async () => {
        try {
            setIsLoadingMovies(true); // Iniciar la carga
            const moviesData = await getPopularMovies(1);
            setMovies(moviesData);
            setMovie(moviesData[0]);

            if (moviesData.length) {
                await fetchMovie(moviesData[0].id);
                setIsLoadingMovies(false);
                }
            } catch (error) {
                console.error(`Error buscando las películas: ${error.message}`);
                setIsLoadingMovies(false); // Finalizar la carga, ya sea éxito o error
        }
    };

    const fetchMovie = async (id) => {
        try {
            const movieData = await getMovieById(id);
            const trailersData = await getTrailersById(id);
                setTrailer(trailersData[0]);
                setMovie(movieData);
        } catch (error) {
            console.error(`Error buscando los trailers: ${error.message}`);
        }
    };

    const selectMovie = async (movie, actualPage) => {
        setActualPage(actualPage);
        fetchMovie(movie.id);
        setMovie(movie);
        setSelectedMovie(movie);
        setShowCardContainer(false);
        window.scrollTo(0, 0);
    };

    const closeBanner = () => {
        setPlaying(false);
        setShowCardContainer(true);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <>
            {isLoadingMovies ? (
                // Muestra el loader mientras las películas están cargando
                <Loader />)  : 
            showCardContainer ? (
                <CarruselHorizontal texto={'peliculas mas populares'} peliculas={movies} selectMovie={selectMovie} actualPage={actualPage}/>
                ) : (
                <main
                    className="viewtrailer"
                    style={{
                    backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`}}>
                    {playing ? (
                    <TrailerPlayer trailer={trailer} closeBanner={closeBanner} />
                    ) : (
                    <BannerContent movie={movie} trailer={trailer} setPlaying={setPlaying} closeBanner={closeBanner} />
                    )}
                </main>
            )}
        </>
    );
}

export default Banner;
