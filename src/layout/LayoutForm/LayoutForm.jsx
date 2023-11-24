import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Boton from '../../components/Boton';
import './LayoutForm.css';

const LayoutForm = ({children}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='LayoutForm'>
            <Navbar/>
                {children}
            <Boton texto={'volver'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={handleGoBack}/>
        </div>
    )
}

export default LayoutForm;


