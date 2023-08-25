import { useState, useEffect } from "react";
import StarRating from "./StarRating";
// import PropTypes from 'prop-types';

const average = (arr) => arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
const KEY = "c36bc62f";

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

  // adding item to the array - watched movie - creating new movie object
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          // reset the error
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          // handling
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();
          if (data.response === "False")
            throw new Error("Movie not found. Please try again.");
          setMovies(data.Search);
          setError("");
          // setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
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
      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

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
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
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
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  // State to hold movie details and loading status
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  // transorforming into arrayof ibj
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

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

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      // easy to calculate stas
      imdbRating: Number(imdbRating),
      // display just part of it
      runtime: runtime.split(" ")[0],
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  // Effect to fetch movie details when selectedId changes
  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=c36bc62f&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  // dom manipulation
  useEffect(function () {
    function callback(e) {
      if (e.key === "Escape") {
        onCloseMovie();
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    }[onCloseMovie];
  });

  // to update page title - works when component is mounted - wont reexecute
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

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
                <p />
                {year} Year
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie{watchUserRating}</p>
              )}
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
// calculation need to be fixed - should display the right time(total) when adding all the movies together
function WatchedSummary({ watched }) {
  // Calculate total runtime in minutes
  const totalRuntime = watched.reduce(
    (total, movie) => total + movie.runtime,
    0
  );

  // Convert total runtime to hours and minutes
  const hours = Math.floor(totalRuntime / 60);
  const minutes = totalRuntime % 60;

  // Format the runtime string
  let runtimeString = "";
  if (hours > 0) {
    runtimeString += `${hours} hr`;
    if (minutes > 0) {
      runtimeString += " ";
    }
  }
  if (minutes > 0) {
    runtimeString += `${minutes} min`;
  }

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
          <span>
            {average(watched.map((movie) => movie.imdbRating)).toFixed(2)}
          </span>
        </p>
        <p>
          <span>🌟</span>
          <span>
            {average(watched.map((movie) => movie.userRating)).toFixed(2)}
          </span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtimeString || "0 min"}</span>
        </p>
      </div>
    </div>
  );
}

// WatchedMoviesList Component
function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

// WatchedMovie Component
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
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
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
