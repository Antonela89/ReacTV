import React from 'react';
import { useState, useEffect } from 'react';
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario';
import Integrante from  '../../components/Integrante/Integrante';
import Contact from '../../components/contact/Contact';
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import './About.css';

const About = () => {

  const [datos, setDatos] = useState ([]);

  useEffect (() => {
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, 'Integrantes');
    getDocs (queryCollection)
      .then(res => setDatos(res.docs.map(user => ({id:user.id, ...user.data()}))))
  }, [])

  return (
    <LayoutSecundario textoBoton={'team'}>
        <div className='Contenedor_About'>
          <div className='Listado_Integantres'>
          {/* mapeo del resultado de firebase: nombre: nombre del integrante y detalle link de redes sociales */}
          {datos.map((dato, i) => (
          <Integrante key={i} nombre={dato.Nombre} apellido={dato.Apellido} Github={dato.Github} Linkedin={dato.Linkedin}/>
          ))}
          </div>
          <Contact style={{width:'50%'}}/>
        </div>
    </LayoutSecundario>   
  )
}

export default About

