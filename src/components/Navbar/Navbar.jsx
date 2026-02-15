import { AppBar, Toolbar, Typography} from '@mui/material';
import { Link, useNavigate} from 'react-router-dom';
import Boton from '../Boton/Boton'
import Busqueda from '../Busqueda/Busqueda'
import AccountCircle from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../context/authContext';  // Importa el hook useAuth
import { useSearch } from '../../context/searchContext';  // Importa el hook useSearch
import colors from '../../config/config.js'

const Navbar = ({onLoginButtonClick}) => {
  const { isAuth, setIsAuth } = useAuth();  // Obtiene el estado de autenticación del contexto
  const { searchQuery, updateSearchQuery } = useSearch(); // Obtiene el estado y las funciones de búsqueda del contexto
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navegar a la ruta "/login"
    setIsAuth(true);
    navigate('/login');
    // console.log(isAuth)
  };

  //modificacion mas rapida del estado isAuth
  // const handleLoginClick = () => {
  //   setIsAuth((prevIsAuth) => {
  //     if (!prevIsAuth) {
  //       navigate('/login');
  //     }
  //     return prevIsAuth;
  //   });
  // };

  const Volver = () => {
    navigate(-1);
  };

  const navigateHome = () => {
    navigate('/home');
  }

  const handleLogoutClick = () => {
    // Cambiar el estado de autenticación a falso
    setIsAuth(false);
    console.log('isAuthLogout:',isAuth)
  };

  // const handleLogoutClick = () => {
  //   // Cambiar el estado de autenticación a falso
  //   setIsAuth((prevIsAuth) => {
  //     console.log('prevIsAuth:', prevIsAuth);
  
  //     // Aquí prevIsAuth representa el valor anterior de isAuth
  //     return false; // Cambiar el estado a falso
  //   });
  
  //   // isAuth aún puede ser verdadero en este punto, ya que la actualización es asíncrona
  //   console.log('isAuthLogout:', isAuth);
  // };

  const handleSearchChange = (e) => {
    // Actualizar el contexto de búsqueda con la palabra escrita en la barra de búsqueda
    updateSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Redireccionar a la página de búsqueda solo si hay un término de búsqueda
    if (searchQuery.trim() !== "") {
      navigate('/search');
    }
  };

  return (
    <AppBar position="static" className='contenedor-navbar' sx={{ backgroundColor: `${colors.azul}`, width:'100%', height:'8rem'}}>
      <Toolbar sx={{ width:'100%', height:'100%', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
        {/* Sección del logo (a la izquierda) */}
        {/* <Typography variant="h6" component="div">
          <img
            src="/assets/img/logo-circular-2.png"
            alt="Logo"
            style={{ height: '6rem', marginRight: '1.6rem', cursor: 'pointer' }}
            onClick={Volver}
          />
        </Typography> */}
        {/* Sección del logo o botón de inicio según la ruta */}
        
        <Typography variant="h6" component="div">
          { !isAuth ? (
            <img
              src="/assets/img/logo-circular-2.png"
              alt="Logo"
              style={{ height: '6rem', marginRight: '1.6rem', cursor: 'pointer' }}
            />
          ) : (
          <>
            <Boton Contenido={HomeIcon} color={`${colors.blanco}`} colorHover={`${colors.naranja}`} fontSize={'5rem'} funcion={navigateHome} />
            <Boton Contenido={ArrowBackIcon} color={`${colors.blanco}`} colorHover={`${colors.naranja}`} fontSize={'5rem'}  funcion={Volver}/>
          </>
          )}
        </Typography>

        {/* Sección de la barra de búsqueda (en el centro) */}
        {isAuth && (
          <Busqueda value={searchQuery}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}/>
        )}

        {/* Sección del botón de inicio de sesión (a la derecha) */}
        { isAuth ? ( 
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Boton Contenido={NoAccountsIcon} color={`${colors.blanco}`} colorHover={`${colors.naranja}`} fontSize={'6rem'} funcion={handleLogoutClick}/>
          </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Boton Contenido={AccountCircle} color={`${colors.blanco}`} colorHover={`${colors.naranja}`} fontSize={'6rem'} funcion={handleLoginClick}/>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
};
export default Navbar;