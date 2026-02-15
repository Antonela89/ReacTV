import { useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Boton from '../../../components/Boton/Boton';
import Banner from '../../../components/Banner/Banner'
import {useNavigate} from 'react-router'
import './HomeMobile.css';
import colors from '../../../config/config.js'

  const MainMobileInvitado = () => {
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
    const [botonClicado, setBotonClicado] = useState('');

    const handleDescripcion = (textoBoton) => {
      setBotonClicado(textoBoton);
      setMostrarDescripcion(true);
    };

    const handleCerrarDescripcion = () => {
      setMostrarDescripcion(false);
    };

    const Descripcion = () => {
      return (
        <div className="ContenedorMobile">
          <Boton texto={botonClicado} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} />
          <div className='DescripcionMobile-Invitado'>
            ¡La descripción está aquí!
          </div>
          <Boton texto={'cerrar'} funcion={handleCerrarDescripcion} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} />
        </div>
      )
    }
    return (
      <>
        <Banner/>
        {!mostrarDescripcion &&
          <ButtonGroup className='GrupoBotonMobile'>
            <Boton texto={'recientes'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleDescripcion('recientes')} />
            <Boton texto={'categorias'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleDescripcion('categorias')} />
            <Boton texto={'generos'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleDescripcion('generos')} />
            <Boton texto={'mi lista'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleDescripcion('mi lista')} />
            <Boton texto={'lanzamientos'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleDescripcion('lanzamientos')} />
          </ButtonGroup>}
        {mostrarDescripcion && (<Descripcion />)}
      </>
    )
  };

  const MainMobileLogueado = () => {
    const navigate = useNavigate();

    const handleButtonClick = (ruta) => {
      console.log(`Navegando a ${ruta}`);
      navigate(ruta);
    };
    
    return (
      <>
        <Banner/>
        <ButtonGroup className='GrupoBotonMobile'>
        <Boton texto={'recientes'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() =>handleButtonClick('/recientes')}/>
          <Boton texto={'categorias'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleButtonClick('/categorias')} />
          <Boton texto={'generos'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleButtonClick('/generos')} />
          <Boton texto={'mi lista'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleButtonClick('/milista')} />
          <Boton texto={'lanzamientos'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={() => handleButtonClick('/lanzamientos')}/>
        </ButtonGroup>
      </>
    )
  };

  const HomeMobile = {
    MainMobileInvitado,
    MainMobileLogueado,
  };


export default HomeMobile;