import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IntroVideo from './components/IntroVideo/IntroVideo.jsx';
import Home from './pages/Home/Home';
import { AuthProvider } from './context/authContext';
import { MediaTypeProvider } from './context/mediaTypeProvider.js';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRuote/ProtectedRoute';
import LoginRegistro from './pages/LoginRegistro/LoginRegistro.jsx';
import Recientes from './pages/Recientes/Recientes.jsx';
import Categorias from './pages/Categorias/Categorias.jsx';
import Generos from './pages/Generos/Generos.jsx';
import MiLista from './pages/MiLista/MiLista.jsx';
import Lanzamientos from './pages/Lanzamientos/Lanzamientos.jsx';
import About from './pages/About/About.jsx';
import Search from './pages/Search/Search.jsx';
import CardSinopsis from './pages/Card/CardSinopsis.jsx';
import Error404 from './pages/Error404/Error404.jsx'; //pagina error 404
import './App.css';

function App() {
	// Obtener el valor de 'showVideo' del almacenamiento local
	const showVideoFromLocalStorage = localStorage.getItem('showVideo');
	const [showVideo, setShowVideo] = useState(
		showVideoFromLocalStorage !== 'false',
	);

	// estado ancho de ventana (renderizado responsive)
	const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

	// useEffect para capturar el ancho de la ventana y pasarlo al estado
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

	// función manejo de video
	const handleVideoEnd = () => {
		console.log('Video ended');
		setShowVideo(false);
		// Guardar el estado en el almacenamiento local
		localStorage.setItem('showVideo', 'false');
	};

	return (
		<>
			<CssBaseline />
			{showVideo ? (
				<IntroVideo onVideoEnd={handleVideoEnd} />
			) : (
				<AuthProvider>
					<MediaTypeProvider>
						<Router>
							<Routes>
								{/* RUTAS PÚBLICAS */}
								<Route
									path="/login"
									element={<LoginRegistro />}
								/>
								<Route path="/about" element={<About />} />

								{/* RUTAS PRIVADAS (Requieren login) */}
								<Route element={<ProtectedRoute />}>
									<Route
										path="/"
										element={
											<Home anchoVentana={anchoVentana} />
										}
									/>
									<Route path="/home" element={<Home />} />
									<Route
										path="/recientes"
										element={<Recientes />}
									/>
									<Route
										path="/categorias"
										element={<Categorias />}
									/>
									<Route
										path="/generos"
										element={<Generos />}
									/>
									<Route
										path="/lanzamientos"
										element={<Lanzamientos />}
									/>
									<Route
										path="/milista"
										element={<MiLista />}
									/>
									<Route
										path="/search"
										element={<Search />}
									/>
									<Route
										path="/card/tv/:id"
										element={<CardSinopsis />}
									/>
									<Route
										path="/card/movie/:id"
										element={<CardSinopsis />}
									/>
								</Route>

								{/* ERROR 404 */}
								<Route
									path="/error404"
									element={<Error404 />}
								/>
								<Route
									path="/*"
									element={<Navigate to="/error404" />}
								/>
							</Routes>
						</Router>
					</MediaTypeProvider>
				</AuthProvider>
			)}
		</>
	);
}

export default App;
