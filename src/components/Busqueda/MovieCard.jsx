import { Link  } from 'react-router-dom';
import colors from '../../config/config.js'

const MovieCard = ({dato}) => {

  const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;

  const MediaTypeBadge = ({ mediaType }) => {
    const getMediaTypeClass = () => {
      return mediaType === 'movie' ? 'movie' : 'series';
    };
    return <h4 className={`text-center ${getMediaTypeClass()}`} style={{margin:'1rem'}}>{mediaType === 'movie' ? 'Película' : 'Serie'}</h4>;
  };
  
  return (
    <div className='col-md-2 mb-3'>
      <Link to={`/card/${dato.media_type}/${dato.id}`} state={{ dato }} style={{textDecoration:'none', color:`${colors.blanco}`}}>
        <img src={`${URL_IMAGE + dato.poster_path}`} alt="" height={300} width="100%" />
        <MediaTypeBadge mediaType={dato.media_type} />
      </Link>
    </div>
  );
};


export default MovieCard;
