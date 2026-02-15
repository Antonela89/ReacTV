import { useNavigate  } from 'react-router-dom';
import { FaFigma } from 'react-icons/fa'; // Importa los íconos necesarios
import GitHubIcon from '@mui/icons-material/GitHub';
import Boton from '../Boton/Boton'
import colors from '../../config/config.js'
import './Footer.css'; // Importa los estilos CSS

/**
 * Componente Footer.
 * @component
 * @return {JSX.Element} Elemento JSX que representa el footer.
 */
function Footer() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navegar a la ruta "/about"
    navigate('/about');
  };

  return (
    <footer>
      {/* Sección izquierda con el ícono de GitHub */}
      <div className="left">
        {/* Enlace a GitHub */}
        <a
          href="https://github.com/ReacTV23/ReacTV"
          target="_blank"
          rel="noopener noreferrer">
            <Boton Contenido={GitHubIcon} color={`${colors.blanco}`} colorHover={`${colors.naranja}`} fontSize={'6rem'} height={'6rem'}/>
        </a>
      </div>

      {/* Sección central con el botón "Team" y el texto "CaC - React 2023" */}
      <div className="center">
        {/* Botón "Team" */}
        <Boton texto={'conocenos'} width={'17rem'} color={`${colors.naranja}`} backgroundColor={`${colors.blanco}`} backgroundHover={`${colors.naranja}`} colorHover={`${colors.blanco}`} funcion={handleClick} />
        {/* Texto "CaC - React 2023" */}
        <a className='link-footer' href='https://buenosaires.gob.ar/educacion/codo-codo-40' target="_blank" rel="noopener noreferrer">
          <p className='p-footer'>CaC - React 2023</p>
        </a>
        
      </div>

      {/* Sección derecha con el ícono de Figma */}
      <div className="right">
      
        {/* Enlace a Figma */}
        <a href="https://www.figma.com/file/rq4z9JNH8yNPbiDvtk3Z8Z/ReacTV2?type=design&node-id=0-1&mode=design&t=gOuMPG6RXiR5qE91-0" target="_blank" rel="noopener noreferrer">
          <Boton Contenido={FaFigma} className='BotonFigma'/>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
