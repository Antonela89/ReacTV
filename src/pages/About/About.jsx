import React from 'react';
import { useState, useEffect } from 'react';
import LayoutSecundario  from '../../layout/LayoutSecundario/LayoutSecundario'
import Titulo from '../../components/Titulo/Titulo'
import Integrante from  '../../components/Integrante/Integrante';
import Contact from '../../components/contact/Contact';
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import Loader from "../../components/Loader/Loader";
import './About.css';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [datos, setDatos] = useState ([]);
  
  useEffect (() => {
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, 'Integrantes');
    setIsLoading(true);
    getDocs (queryCollection)
      .then(res => setDatos(res.docs.map(user => ({id:user.id, ...user.data()}))))
      setIsLoading(false);
  }, [])

  return (
    <LayoutSecundario textoBoton={'about'}>
        <div className='Contenedor_About'>
          <div className='Integantres'>
            <Titulo texto={'team'}/>
            { isLoading ? 
            (<Loader/>) 
            : (<div className='Listado'>
              {/* mapeo del resultado de firebase: nombre: nombre del integrante y detalle link de redes sociales */}
              {datos.map((dato, i) => (
              <Integrante key={i} nombre={dato.Nombre} apellido={dato.Apellido} Github={dato.Github} Linkedin={dato.Linkedin}/>
              ))}
            </div>)}
          </div>
          <Contact style={{width:'50%'}}/>
        </div>
    </LayoutSecundario>   
  )
}

export default About

