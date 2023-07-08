import { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Search from "./Search";
import Numresults from "./Numresults";

import MovieList from "./MovieList";
import Box from "./Box";
import WathcedSummary from "./WathcedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDelaits from "./MovieDelaits";

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
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdID !== id));
  }

  function handleCloseDetails() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
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
          if (
            err.name !== "AbortError" ||
            "Something went wrong with fetching movies"
          ) {
            setError(err.message);
            setError("");
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseDetails();
      fetchMovies();
      return function () {
        controller.abort();
      };
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
              <WathcedSummary watched={watched} />
              <WatchedMoviesList
                key={watched.imdID}
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
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
