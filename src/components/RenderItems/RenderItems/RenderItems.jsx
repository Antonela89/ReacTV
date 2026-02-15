import Boton from '../../Boton/Boton';
import Titulo from '../../Titulo/Titulo';
import CardImg from '../../Card/CardImg/CardImg'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import colors from '../../../config/config.js'
import './RenderItems.css'

const RenderItems = ({  items, 
                        itemsPaginado, 
                        type, 
                        setItemsFunction, 
                        handleDelete, 
                        navigate,  
                        ITEMS_PER_PAGE, 
                        paginate }) => {

    return (
        <div className='contenedor-renderItems' >
            <Titulo texto={`${type}`} />
            <div className='renderItems-items'>
                {items.map((item) => (
                    <div className='contenedor-item' key={item.id}>
                        <div className='contenedor-card'>
                            <CardImg peli={item} width={200} height={300} funcion={() => navigate(`/card/movie/${item.id}`)} />
                        </div>
                        <div className='contenedor-boton-card'>
                            <Boton
                                Contenido={DeleteForeverIcon}
                                fontSize={'4rem'}
                                height={'4rem'}
                                padding={'0.5rem'}
                                color={`${colors.blanco}`}
                                backgroundColor={`${colors.azul}`}
                                backgroundHover={`${colors.naranja}`}
                                funcion={() => handleDelete(item.id, type, setItemsFunction)}/>
                        </div>
                    </div>
                ))}
            </div>
            {/* Paginación */}
            {itemsPaginado.length > ITEMS_PER_PAGE && (
                <div className='paginado'>
                    {Array.from({ length: Math.ceil(itemsPaginado.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
                        <Boton
                            texto={page}
                            funcion={() => paginate(page)}
                            key={page}
                            width={'3rem'}
                            color={`${colors.blanco}`}
                            backgroundColor={`${colors.azul}`}
                            backgroundHover={`${colors.naranja}`}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RenderItems;