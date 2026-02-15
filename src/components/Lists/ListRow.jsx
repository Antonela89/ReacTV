import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Titulo from "../Titulo/Titulo";
import CarruselMini from "./CarruselMini/CarruselMini";

const cardClick = (movie) => {
  // console.log("Card Clicked", movie);
  const currentUrl = window.location.origin;
  const url = `${currentUrl}/card/${movie.media_type}/${movie.id}`;
  window.location.href = url;
};

const ListRow = ({ title, fetchDataFunction, page = 1, genre }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = genre
          ? await fetchDataFunction(page, genre)
          : await fetchDataFunction(page);
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchDataFunction, page, genre]);

  return (
    <div>
      <Titulo texto={title} />
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ width: "100%" }}>
          <CarruselMini
            items={movies}
            cardWidth={150}
            onCardClick={cardClick}
          />
        </div>
      )}
    </div>
  );
};

export default ListRow;
