import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="black" maxRating={10} onSetRating={setMovieRating} />
      <p> This movie has {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Good", "Perfect", "Best"]}
    />
    <StarRating size={20} color="pink" className="test" defaultRating={3} />
    <Test />
  </React.StrictMode>
);
