import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const Boton = ({Contenido, texto, funcion, color, colorHover, fontSize, width, height, backgroundColor, backgroundHover }) => {
  if(Contenido) {
    const Icono = Contenido;
    return (
     // Si hay un icono, renderiza un IconButton
      <IconButton className='IconoBoton' aria-label={Icono} onClick={funcion}>
        <Icono className='Icono'
          sx={{fontSize: {xs:'30px', sm: fontSize, md: fontSize},
          height: height, 
          color: {color},
          ':hover': {color: colorHover}
          }}/>
      </IconButton>
      )}
  else {
    return (
    // Si no hay un icono, renderiza un Button
      <Button sx={{
      width: { xs:width, sm:'360px'},
      color: color,
      height: '50px',
      margin: '10px 0',
      paddiing: '1rem',
      borderRadius: '30px',
      fontFamily: 'Roboto',
      fontSize: '22px',
      textTransform: 'uppercase',
      backgroundColor: backgroundColor,
      fontWeight: 'Normal',
      ':hover': {backgroundColor: backgroundHover, color: colorHover},
    }} 
    variant="contained"
    onClick={funcion}>
      {texto}
    </Button>
    )} 
}

export default Boton;
