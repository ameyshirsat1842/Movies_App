import "../css/Favorites.css";
import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorite() {
  const { favorites } = useContext(MovieContext);

  if (favorites.length > 0) {
    return (
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>Favorites</h2>
      <p>You have no favorite movies yet.</p>
    </div>
  );
}

export default Favorite;
