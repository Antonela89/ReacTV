import { useEffect, useState } from 'react';
import Children from '../../Children/Children';
import RenderItems from '../RenderItems/RenderItems';
import { getMovieById, getTVById } from "../../../services/tmdbService.js";
import { collection, getDocs } from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase/Firebase.js';
import { deleteDoc} from 'firebase/firestore';
import { useNavigate  } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const RenderItemsContainer = ({ userEmail, pathMovies, pathSeries }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [movieIds, setMovieIds] = useState([]);
    const query = collection(db, 'Usuarios');
    const [docs, loading, error] = useCollectionData(query);
    const [seriesIds, setSeriesIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const navigate = useNavigate();
    const mySwal = withReactContent(Swal);


    const handleMovieIds = (ids, setDataFunction) => {
        if (movieIds.length !== ids.length) {
            setDataFunction(ids);
        }
    };

    const handleSeriesIds = (ids, setDataFunction) => {
        if (seriesIds.length !== ids.length) {
            setDataFunction(ids);
        }
    };

    //paginación
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
    const currentSeries = series.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getData = async (ids, fetchDataFunction, setDataFunction) => {
        try {
            const promises = ids.map(async (id) => await fetchDataFunction(id));
            const data = await Promise.all(promises);
            setDataFunction(data);
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
        }
    };

    useEffect(() => {
        if (userEmail && (movieIds.length > 0 || seriesIds.length > 0)) {
            getData(movieIds, getMovieById, setMovies);
            getData(seriesIds, getTVById, setSeries);
        }
    }, [userEmail, movieIds, seriesIds]);

    const handleDelete = async (id, type, setDataFunction) => {
        try {
        //console.log(type)
        const path = type === 'peliculas' ? pathMovies : pathSeries;

        const querySnapshot = await getDocs(collection(db, path));
        const docToDelete = querySnapshot.docs.find((doc) => doc.data().id === id);

        if (docToDelete) {
            await deleteDoc(docToDelete.ref);
            setDataFunction((prevItems) => prevItems.filter((item) => item.id !== id));
            console.log('Item deleted successfully');
            } else {
                console.log('Document not found for item with ID:', id);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const confirmDelete = (id, type, setDataFunction) => {
        mySwal
            .fire({
                title: "¿Estas seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "¡Si, Eliminar!",
                cancelButtonText: "Cancelar",
            })
            .then((result) => {
                if (result.isConfirmed) {
                // Llamo a la función para eliminar
                    handleDelete(id, type, setDataFunction);
                        mySwal.fire(
                            "Eliminado!",
                            "El item ha sido eliminado.",
                            "success",
                        );
                    }
            });
        };

    return (
        <>
            <Children path={pathMovies} onDataReceived={(ids) => handleMovieIds(ids, setMovieIds)} />
            <Children path={pathSeries} onDataReceived={(ids) => handleSeriesIds(ids, setSeriesIds)} />

            {loading ? (
                <Loader />
            ) : (
                <div style={{width:'100%', display: 'flex', flexDirection: 'column'}}>
                    {movies.length > 0 && (
                        <RenderItems
                            items={currentMovies}
                            itemsPaginado={movies}
                            type='peliculas'
                            setItemsFunction={setMovies}
                            handleDelete={confirmDelete}
                            navigate={navigate}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            paginate={paginate}/>
                    )}

                    {series.length > 0 && (
                        <RenderItems
                            items={currentSeries}
                            itemsPaginado={series}
                            type='series'
                            setItemsFunction={setSeries}
                            handleDelete={confirmDelete}
                            navigate={navigate}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            paginate={paginate}/>
                    )}
                </div>
            )}
        </>
    );
};

export default RenderItemsContainer;
