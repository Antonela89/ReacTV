import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { FaFigma } from 'react-icons/fa'; // Importa los íconos necesarios
import GitHubIcon from '@mui/icons-material/GitHub';
import Boton from '../Boton'
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
            <Boton Contenido={GitHubIcon} color={'white'} colorHover={'#E08400'} fontSize={'60px'} height={'60px'}/>
        </a>
      </div>

      {/* Sección central con el botón "Team" y el texto "CaC - React 2023" */}
      <div className="center">
        {/* Botón "Team" */}
        <Boton texto={'team'} width={'170px'} color={'#E08400'} backgroundColor={'white'} backgroundHover={'#E08400'} colorHover={'white'} funcion={handleClick} />
        {/* Texto "CaC - React 2023" */}
        <a className='link' href='https://buenosaires.gob.ar/educacion/codo-codo-40' target="_blank" rel="noopener noreferrer">
          <p>CaC - React 2023</p>
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
