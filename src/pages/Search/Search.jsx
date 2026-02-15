import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import MoviesContainer from '../../components/Busqueda/MoviesContainer'

const Search = () => {
    return (
        <LayoutSecundario textoBoton={'resultados'}>
            <MoviesContainer />
        </LayoutSecundario>
    )
}

export default Search;
