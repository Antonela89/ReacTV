import { useNavigate } from 'react-router-dom';
import './LayoutForm.css';
import Navbar from '../../components/Navbar/Navbar'
import Boton from '../../components/Boton/Boton';
import colors from '../../config/config.js'

const LayoutForm = ({children}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='LayoutForm'>
            <Navbar/>
                {children}
            <Boton texto={'volver'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`} funcion={handleGoBack}/>
        </div>
    )
}

export default LayoutForm
