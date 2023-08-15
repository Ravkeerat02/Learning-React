// styling for teh file(stars)
const conatinerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
// doesnt have to be regenerated everytime as its been placed differentky

const starRatingStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

export default function StarRating({ maxRating }) {
  return (
    <div style={conatinerStyle}>
      <div style={starRatingStyle}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>${i + 1}</span>
        ))}
      </div>
      <p style={textStyle}></p>
    </div>
  );
}
