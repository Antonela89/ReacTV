import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../components/Boton';
import './LayoutSecundario.css';
import Navbar from '../../components/navbar/Navbar';

const LayoutSecundario = ({children, textoBoton}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='LayoutSecundario'>
        <Navbar/>
        <Boton texto={textoBoton} backgroundColor={'#003686'} backgroundHover={'#E08400'}/>
        {children}
        <Boton texto={'volver'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={handleGoBack}/>
    </div>
  )
}

export default LayoutSecundario
