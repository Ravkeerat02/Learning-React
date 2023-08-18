import React, { useState } from "react";
import PropTypes from "prop-types";

// Styling for the container of the stars and the rating text
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

// Styling for the star rating area
const starRatingStyle = {
  display: "flex",
};

//represents what kind od data is being represnented
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

// StarRating component that allows users to rate with stars
export default function StarRating({
  maxRating = 5,
  color = "#f39",
  size = 48,
  // can be used to make different chaanges as per user
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  // State for the overall rating and temporary rating during hover
  //defaultRating is used to set the default rating(inital)
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  // Function to handle setting the rating when a star is clicked
  function handleRating(rating) {
    // set interal rating
    setRating(rating);
    // set external rating
    onSetRating(rating);
  }

  // Styling for the text that displays the rating
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    // classname can be used to make custome changes
    <div style={containerStyle} className={className}>
      <div style={starRatingStyle}>
        {/* Generate stars based on the maxRating */}
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleRating(i + 1)}
            // Determine if a star should be displayed as full or not based on tempRating or rating
            // displays the respetive word to the respective start
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            // Set temporary rating during hover
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

// Star component that represents an individual star
function Star({ full, onClick, onHoverIn, onHoverOut, color, size }) {
  // Styling for an individual star
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {/* Conditionally render a filled or outline star based on 'full' prop */}
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          {/* Filled star SVG path */}
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          {/* Outline star SVG path */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
