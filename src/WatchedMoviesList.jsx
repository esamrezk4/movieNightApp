import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched, handleRemoveMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          handleRemoveMovie={handleRemoveMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
