import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StatRating from "./StatRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StatRating
        maxRating={10}
        color="blue"
        onSetRating={setMovieRating}
      />
      <p>this movie rating {movieRating} Star</p>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*<App />*/}

    <StatRating />
    <Test />
  </React.StrictMode>
);
