import { useState, useEffect }  from 'react';
import MovieCard from './MovieCard';
import { searchTMDB } from '../../services/tmdbService.js';
import { useSearch } from '../../context/searchContext';  // Importa el hook useSearch
import Loader from '../Loader/Loader';

const MoviesContainer = () => {
  const { searchQuery } = useSearch(); // Obtiene el estado y las funciones de búsqueda del contexto

  //variables de estado
  const [searchData, setSearchData] = useState([]);

  const getDataBusqueda = async () => {
    try {
      const data = await searchTMDB(searchQuery, "multi", 1);
      setSearchData(data);
      //console.log('moviesContainer:', data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Realiza la búsqueda solo si hay un término de búsqueda
      if (searchQuery.trim() !== "") {
        getDataBusqueda();
      } else {
        // Si el término de búsqueda está vacío, reinicio los resultados
        setSearchData([]);
      }
    };

    fetchData();
  }, [searchQuery]); // Ahora useEffect depende de searQuery

  return (
    <div className='container mt-3' style={{height:'100%'}}>
      {searchData === null ? (
        <Loader />
          ) : searchData && searchData.length === 0 ? (
            <p style={{textAlign:'center', fontSize: '1.5rem'}}>No hay resultados</p>
          ) : (
            <div className='row' style={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
              {searchData.map((result) => (
                result.poster_path && (
                  <MovieCard key={result.id} dato={result} />
                  )
              ))}
            </div>
          )
        }
    </div>
  );
};

export default MoviesContainer;
