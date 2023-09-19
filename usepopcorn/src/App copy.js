import { useState } from "react";

const average = (arr) => arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

export default function App() {
  // State for movies list
  // movioe(state) is being used to call out the component
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Logo />
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* <Box>
          <MovieList movies={movies} />
        </Box>
        {/* <WatchedBox /> */}
      </Main>
      <Box element={<MovieList movies={movies} />}>
        <WatchedSummary watched={watched} />
        <WatchedMoviesList watched={watched} />
      </Box>
    </>
  );

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
    return (
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
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
        {isOpen && { children }}
      </div>
    );
  }

  {
    /* 
{/* // // WatchedBox Component */
  }
  {
    /* // function WatchedBox() { */
  }
  //   const [isOpen2, setIsOpen2] = useState(true);
  //   const [watched, setWatched] = useState(tempWatchedData);

  //   return (
  //     <div className="box">
  //       <button
  //         className="btn-toggle"
  //         onClick={() => setIsOpen2((open) => !open)}
  //       >
  //         {isOpen2 ? "–" : "+"}
  //       </button>
  //       {/* conditional rendering */}
  //       {isOpen2 && (
  //         <>
  //           {/* WatchedSummary Component */}
  //           <WatchedSummary watched={watched} />
  //           {/* WatchedMoviesList Component */}
  //           <WatchedMoviesList watched={watched} />
  //         </>
  //       )}
  //     </div>
  //   );
  // } */}

  // Movielist Component
  function MovieList({ movies }) {
    return (
      <ul className="list">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    );
  }

  // Movie Component
  function Movie({ movie }) {
    return (
      <li key={movie.imdbID}>
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
}
