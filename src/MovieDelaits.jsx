import React, { Fragment, useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const MovieDelaits = ({
  selectedId,
  onCloseDetails,
  KEY,
  handleWhatchedMovie,
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [movie, setMovie] = useState({});
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

  function handleAddMovieToWatched() {
    const newWatchedMovie = {
      imdID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: 
    };
    handleWhatchedMovie(newWatchedMovie);
    onCloseDetails();
  }
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsloading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <header>
            <button
              className="btn-back"
              onClick={onCloseDetails}
            >
              &larr;
            </button>
            <img
              src={poster}
              alt={`Poster of ${movie} movie`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                // onSetRating={setUserRating}
              />
              <button
                onClick={handleAddMovieToWatched}
                className="btn-add"
                // onClick={handleAdd}
              >
                + Add to list
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </Fragment>
      )}
    </div>
  );
};

export default MovieDelaits;
