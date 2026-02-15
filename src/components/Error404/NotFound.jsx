import 'video.js/dist/video-js.css';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container"> 
            <video className="error404" src="/assets/videos/error404.mp4"></video>     
        </div>
    );
};

export default NotFound;


