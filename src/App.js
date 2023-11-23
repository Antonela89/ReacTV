import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IntroVideo from './components/IntroVideo/IntroVideo.jsx';
import Home from './pages/Home/Home';
import {AuthProvider} from './context/authContext'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ProtectedRoute} from './components/ProtectedRuote/ProtectedRoute'
import LoginRegistro  from './pages/LoginRegistro/LoginRegistro.jsx'
import Recientes from './pages/Recientes/Recientes.jsx'
import Categorias from './Pages/Categorias/Categorias.jsx'
import Generos from './pages/Generos/Generos.jsx'
import MiLista from './pages/MiLista/MiLista.jsx'
import Lanzamientos from './pages/Lanzamientos/Lanzamientos.jsx'
import About from './pages/About/About.jsx'
// import VideoPlayer from './components/IntroVideo/VideoPlayer.jsx'
import './App.css';

function App() {
  const [showVideo, setShowVideo] = useState(false); //pasar a true una vez que se terminen las pruebas
  // estado ancho de ventana (renderizado responsive)
  const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

  // useEfectf para capturar el ancho de la ventana y pasarlo al estado
  useEffect(() => {
    const handleResize = () => {
      setAnchoVentana(window.innerWidth);
    };

     // Agregar event listener para el evento resize
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  // const toggleAuth = () => {
  //   setIsAuth((prevAuth) => !prevAuth);
  // };

  // funcion manejo de video
  const handleVideoEnd = () => {
    console.log('Video ended');
    setShowVideo(false);
  };
  
  
  return (
    <>
    <CssBaseline/>

      { showVideo ? (
        // <VideoPlayer/>
        <IntroVideo onVideoEnd={handleVideoEnd} />
      ) : (
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home anchoVentana={anchoVentana}/>} />
              <Route path="/login" element={<LoginRegistro />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
              <Route path="/recientes" element={<Recientes />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/generos" element={<Generos />} />
              <Route path="/milista" element={<MiLista />} />
              <Route path="/lanzamientos" element={<Lanzamientos />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Router>
        </AuthProvider>
      )} 
    </>
  )
}

export default App;

