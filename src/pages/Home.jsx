import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, fetchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular movies on mount
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // Handle search submit
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return; // Prevent multiple submissions
    setLoading(true);
    try {
      const data = await searchMovies(searchQuery);
      setMovies(data);
    } catch (error) {
      console.error(error);
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
