export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>START ADDING STUFF TO THE LIST</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      {/* em - emphases */}
      <em>
        {percentage === 100
          ? "You got everything! Ready to go"
          : `You have ${numItems} items in your list and you packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
