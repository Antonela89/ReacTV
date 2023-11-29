<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import html2canvas from 'html2canvas';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import EventIcon from '@mui/icons-material/Event';
import CardImg from '../Card/CardImg/CardImg';
import Boton from '../Boton';
import { getUpcomingMovies } from '../../services/tmdbService.js';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

const WritableCalendar = ({ onInfoChange }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const overlayRef = useRef(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    getUpcomingMoviesData();
  }, []);

  const getUpcomingMoviesData = async () => {
    try {
      const data = await getUpcomingMovies();
      setUpcomingMovies(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleMovieClick = (movieId) => {
    console.log('Clicked on movie with ID:', movieId);
    setSelectedMovieId(movieId);
  };

  const handleClick = (peli) => {
    navigate('/card', { dato: peli });
  };

  const downloadCalendar = async () => {
    try {
      const calendarContainer = document.getElementById('calendar-container');
      const overlayContainer = overlayRef.current;

      const wrapperElement = document.createElement('div');
      wrapperElement.className = 'calendar-wrapper';

      const clonedCalendar = calendarContainer.cloneNode(true);
      wrapperElement.appendChild(clonedCalendar);

      const eventsDiv = document.createElement('div');
      eventsDiv.className = 'events-overlay';
      wrapperElement.appendChild(eventsDiv);

      Object.entries(events).forEach(([eventDate, eventText]) => {
        const dateCell = clonedCalendar.querySelector(
          `.react-calendar__tile[data-date="${eventDate.split('T')[0]}"]`
        );
        if (dateCell) {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'event-marker';
          eventDiv.textContent = eventText;
          eventsDiv.appendChild(eventDiv);
        }
      });

      upcomingMovies.forEach((movie) => {
        const movieDate = new Date(movie.release_date);
        const dateString = movieDate.toISOString().split('T')[0];
        const dateCell = clonedCalendar.querySelector(
          `.react-calendar__tile[data-date="${dateString}"]`
        );
        if (dateCell) {
          const movieDiv = document.createElement('div');
          movieDiv.className = 'movie-marker';
          movieDiv.textContent = movie.title;
          movieDiv.setAttribute('data-id', movie.id);
          eventsDiv.appendChild(movieDiv);
        }
      });

      window.requestAnimationFrame(async () => {
        const canvas = await html2canvas(document.documentElement, {
          scale: 2,
          allowTaint: true,
<<<<<<< HEAD
          useCORS: false,
=======
          useCORS: false,  // o puedes probar con useCORS: false
>>>>>>> de2404a (Cambios)
        });

        const imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);

        const a = document.createElement('a');
        a.href = imageDataUrl;
        a.download = 'full_document.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        overlayContainer.innerHTML = '';
      });
    } catch (error) {
      console.error('Error capturing document:', error);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events[dateString] || [];

      return (
        <div className="tile-content">
          {dayEvents.map((event, index) => (
            <p key={index} className="event-text">
              {event}
            </p>
          ))}
          {upcomingMovies
            .filter(
              (movie) =>
                new Date(movie.release_date).toDateString() ===
                date.toDateString()
            )
            .map((movie) => (
              <p
                key={movie.id}
                className="movie-name"
                onClick={() => handleMovieClick(movie.id)}
              >
                {movie.title}
              </p>
            ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mt-2" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h5 className="mb-2" style={{ textAlign: 'center', textTransform: 'uppercase' }}>Calendario de estrenos</h5>
      <div className="row" style={{ width: '100%', display: 'flex' }}>
        <div className="card p-3" id="calendar-container" style={{ width: '60%', backgroundColor: '#003686' }}>
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileContent={tileContent}
            className="custom-calendar" />
        </div>
        {selectedMovieId && (
          <div style={{
            width: '40%',
            backgroundColor: '#003686',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            ':hover': {
              backgroundColor: '#E08400',
            },
          }}>
            <CardImg peli={upcomingMovies.find((movie) => movie.id === selectedMovieId)} funcion={() => handleClick(upcomingMovies.find((movie) => movie.id === selectedMovieId))} />
          </div>
        )}
      </div>
      <div className="mt-3">
        <Boton Contenido={DownloadForOfflineIcon} color={'#003686'} colorHover={'#E08400'} fontSize={'60px'} funcion={downloadCalendar} />
        <Boton Contenido={EventIcon} color={'#003686'} colorHover={'#E08400'} fontSize={'60px'} />
      </div>
      <div ref={overlayRef} className="overlay-container" style={{ display: 'none' }} />
    </div>
  );
};

export default WritableCalendar;
=======
>>>>>>> c8be1f837c746fb834e4318de00cf759cadc6234
