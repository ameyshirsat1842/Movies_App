import "../css/MovieCard.css";
import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(MovieContext);
  const isMovieFavorite = isFavorite(movie.id);

  function handleFavoriteClick(event) {
    event.preventDefault();
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${isMovieFavorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
          >
            {isMovieFavorite ? "❤️" : "🤍"}
          </button>
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
