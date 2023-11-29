import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../../components/Boton';
import './LayoutSecundario.css';
<<<<<<< HEAD
import Navbar from '../../components/navbar/Navbar';
=======
import Navbar from '../../components/navbar/Navbar'
>>>>>>> 010b642a593beb5a6c45ec61c92a709ed537ff18

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
