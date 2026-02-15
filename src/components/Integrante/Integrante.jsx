import GitHubIcon from '@mui/icons-material/GitHub';
import Boton from '../Boton/Boton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ButtonGroup } from 'react-bootstrap';
import colors from '../../config/config.js'
import './Integrante.css';

const Integrante = ({nombre,apellido, Github, Linkedin}) => {
  return (
    <div className='Contenedor' key={nombre}>
      <div className='Nombre'>{nombre} {apellido}</div>
      <ButtonGroup className='GrupoBotones'
        aria-label="small button group">
        <a href={Github} target="_blank" rel="noopener noreferrer">
          <Boton Contenido={GitHubIcon} color={`${colors.negro}`}/>
        </a>
        <a href={Linkedin} target="_blank" rel="noopener noreferrer">
          <Boton Contenido={LinkedInIcon} color={`${colors.negro}`}/>
        </a>
      </ButtonGroup>
    </div> 
)}

export default  Integrante
  