import { useMediaType } from "../../context/mediaTypeProvider";
import Titulo from '../Titulo/Titulo'
import Checkbox from '../Checkbox/Checkbox'
import './MediaSelector.css'

const MediaSelector = () => {
  const { mediaType, changeMediaType } = useMediaType();

  const handleRadioChange = (event) => {
    const newType = event.target.value;
    changeMediaType(newType);
  };

  return (
    <div className='contenedor-mediaSelector'>
      <Titulo texto={'Seleccione el tipo de medio'}/>
      <div className='contenedor-checkbox'>
        <Checkbox 
          texto={'Películas (Movie)'} 
          name={"mediaType"} 
          value={'movie'} 
          checked={mediaType === "movie"} 
          onChange={handleRadioChange}/>
        <Checkbox 
          texto={'Series (TV)'} 
          name={"mediaType"} 
          value={'tv'} 
          checked={mediaType === "tv"} 
          onChange={handleRadioChange}/>
        <Checkbox 
          texto={'Todos (All)'} 
          name={"mediaType"} 
          value={'all'} 
          checked={mediaType === "all"} 
          onChange={handleRadioChange}/>
      </div>
    </div>
  );
};

export default MediaSelector;
