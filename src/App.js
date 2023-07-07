import { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Logo from "./Logo";
import Search from "./Search";
import Numresults from "./Numresults";

import WatchedBox from "./WatchedBox";
import MovieList from "./MovieList";
import Box from "./Box";
import WathcedSummary from "./WathcedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDelaits from "./MovieDelaits";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751654",
    Title: "lil",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const KEY = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("super");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleWhatchedMovie(movie) {
    setWatched((watchedMovie) => [...watchedMovie, movie]);
  }
  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  function handleCloseDetails() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          console.log(data.Search);
          setError("");
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <Fragment>
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <Numresults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* isLoading ? <Loader /> : <MovieList movies={movies} /> */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              selectedId={selectedId}
              movies={movies}
              onselectedMovie={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDelaits
              handleWhatchedMovie={handleWhatchedMovie}
              KEY={KEY}
              selectedId={selectedId}
              onCloseDetails={handleCloseDetails}
              watched={watched}
            />
          ) : (
            <Fragment>
              <WathcedSummary
                watched={watched}
                handleRemoveMovie={handleRemoveMovie}
              />
              <WatchedMoviesList
                watched={watched}
                handleRemoveMovie={handleRemoveMovie}
              />
            </Fragment>
          )}
        </Box>
      </Main>
      {/* <StarRating
        maxRating={5}
        messages={["temp ", "nice", "good", "okay", "amazing"]}
        defaultRating={2}
      />
      <StarRating maxRating={10} />
  <StarRating />*/}
    </Fragment>
  );
}
