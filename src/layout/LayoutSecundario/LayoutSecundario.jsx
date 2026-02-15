import { useNavigate } from 'react-router-dom';
import Boton from '../../components/Boton/Boton';
import './LayoutSecundario.css';
import Navbar from '../../components/Navbar/Navbar'
import colors from '../../config/config.js'

const LayoutSecundario = ({children, textoBoton}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='LayoutSecundario'>
        <Navbar/>
        <Boton texto={textoBoton} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`}/>
        {children}
        <Boton texto={'volver'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={handleGoBack}/>
    </div>
  )
}

export default LayoutSecundario
