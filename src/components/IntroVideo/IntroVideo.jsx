import { useEffect, useState } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import './IntroVideo.css';

const IntroVideo = ({ onVideoEnd }) => {
  const [skipIntro, setSkipIntro] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    const player = videojs('introVideo', {
      autoplay: true,
      muted: false,
      controls: false,
      sources: [
        {
          src: '/assets/videos/video-2-intro.mp4',
          type: 'video/mp4',
        },
      ],
    });

    player.on('click', () => {
      player.controls(player.controls() ? false : true);
    });

    // Oculta el botón solo después de que el video ha terminado
    player.on('ended', () => {
      if (!skipIntro) {
        setShowPlayButton(false);
        onVideoEnd();
      }
    });

    // Muestra el botón "Omitir Intro" después de un breve retraso
    setTimeout(() => {
      setShowSkipButton(true);
    }, 1000); // Ajusta el tiempo de espera según sea necesario

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [onVideoEnd, skipIntro]);

  const handleSkipIntro = () => {
    setSkipIntro(true);
    setShowPlayButton(false); // Oculta el botón "Play Intro" cuando se omite la intro
    setShowSkipButton(false); // Oculta el botón "Omitir Intro" cuando se omite la intro
    onVideoEnd();
  };

  const handlePlayIntro = () => {
    const player = videojs('introVideo');
    player.play();
    setShowPlayButton(false);
  };

  return (
    <div className="intro-video-container">
      <video id="introVideo" className="video-js vjs-default-skin" />
      {!skipIntro && showSkipButton && (
        <button onClick={handleSkipIntro} className="skip-intro-button">
          Omitir Intro
        </button>
      )}
      {!skipIntro && showPlayButton && (
        <button onClick={handlePlayIntro} className="play-intro-button">
          Play Intro
        </button>
      )}
    </div>
  );
};

export default IntroVideo;




