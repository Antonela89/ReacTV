import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';
import Boton from '../Boton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useAuth } from '../../context/authContext';  // Importa el hook useAuth

const Navbar = ({onLoginButtonClick}) => {
  const { isAuth, setIsAuth  } = useAuth();  // Obtiene el estado de autenticación del contexto
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navegar a la ruta "/login"
    setIsAuth(true);
    navigate('/login');
    console.log(isAuth)
  };

  const handleLogoutClick = () => {
    // Cambiar el estado de autenticación a falso
    setIsAuth(false);
    // Navegar a la ruta "/"
    // navigate('/');
    console.log(isAuth)
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#003686', width:'100%', height:'80px'}}>
      <Toolbar sx={{ width:'100%', height:'100%', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
        {/* Sección del logo (a la izquierda) */}
        <Typography variant="h6" component="div">
          <img
            src="/assets/img/logo-circular-2.png"
            alt="Logo"
            style={{ height: '60px', marginRight: '16px' }}
          />
        </Typography>

        {/* Sección de la barra de búsqueda (en el centro) */}
        {isAuth && (
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '50px', padding: '0px' }}>
            <IconButton color="primary" size="large">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
              style={{ width: '360px', color: 'black' }}
            />
          </div>
        )}

        {/* Sección del botón de inicio de sesión (a la derecha) */}
        { isAuth ? ( 
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Boton Contenido={NoAccountsIcon} color={'white'} colorHover={'#E08400'} fontSize={'60px'} funcion={handleLogoutClick}/>
        </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Boton Contenido={AccountCircle} color={'white'} colorHover={'#E08400'} fontSize={'60px'} funcion={handleLoginClick}/>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
};
export default Navbar;