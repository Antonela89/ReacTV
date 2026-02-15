import './CardImg.css'

const CardImg = ({peli, height = 600, width = 400, funcion}) => {
    const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;
    return (
        <div className='CardImg' key={peli.id} onClick={() =>funcion(peli)}>
            <img
                src={`${IMAGE_PATH + peli.poster_path}`}
                alt=""
                height={height}
                width={width}
                style={{objetFit: 'containt', borderRadius:'1rem'}}/>
        </div>
    )
}

export default CardImg
