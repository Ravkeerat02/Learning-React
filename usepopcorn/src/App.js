import { useState, useEffect } from "react";
import StarRating from "./StarRating";
// import PropTypes from 'prop-types';

const average = (arr) => arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

// keep outside main component - for better usage
function Loader() {
  return <div className="loader">Loading...</div>;
}

export default function App() {
  // State for movies list
  // movioe(state) is being used to call out the component
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // effect only run after loading
  // async function - returns a promise
  // effect will run twice - only in developermtn - to check if there is any error
  // event handler function
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        // reset the error
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=c36bc62f&s=${query}`
        );
        // handling
        if (!res.ok) {
          throw new Error("Whoops. It didn't go as planned");
        }

        const data = await res.json();
        if (data.response === "False")
          throw new Error("Whoops. It didn't go as planned");
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    // resulting an empty array
    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <Logo />
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* Condition rENDERING - display movie list if there is no error */}
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {/* either its loading - if not there is an eror */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );

  // compoennt displayed when ID

  // error component
  function ErrorMessage({ message }) {
    return <p className="error">❌</p>;
  }

  // Search Component
  function Search({ query, setQuery }) {
    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    );
  }

  // Navbar Component
  function NavBar({ children }) {
    return <nav className="nav-bar">{children}</nav>;
  }

  // Logo Component
  function Logo() {
    return (
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    );
  }

  // NumResults Component
  function NumResults({ movies }) {
    const numResults = movies ? movies.length : 0;

    return (
      <p className="num-results">
        Found <strong>{numResults}</strong> results
      </p>
    );
  }
  // Main Component
  function Main({ children }) {
    return (
      <main className="main">
        {/* ListBox Component */}
        {children}
      </main>
    );
  }

  // ListBox Component
  function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    );
  }
}
// Information displayed for selected ID
function MovieDetails({ selectedId, onCloseMovie }) {
  // State to hold movie details and loading status
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Destructure object properties from the movie state
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // Effect to fetch movie details when selectedId changes
  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=c36bc62f&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back " onClick={onCloseMovie}>
              &larr;&nbsp;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb Rating
                {year} Year
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

// Movielist Component
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

// Movie Component
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

// WatchedSummary Component
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

// WatchedMoviesList Component
function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

// WatchedMovie Component
function WatchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
