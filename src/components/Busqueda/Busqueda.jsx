import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Busqueda.css';
import colors from '../../config/config.js';

const Busqueda = ({value, onChange, onSubmit}) => {

  return (
    <div className="Busqueda">
      <IconButton style={{backgroundColor:`${colors.blanco}`}}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder= "Buscar..."
        inputProps={{ 'roboto': 'buscar' }}
        style={{  width:'80%', 
                  color:`${colors.negro}`, 
                  backgroundColor:`${colors.blanco}`, 
                  fontSize: '1.5rem',
                  padding: '0.5rem'}}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}/>
    </div>
  );
}

export default Busqueda;