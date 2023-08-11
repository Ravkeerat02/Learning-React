// setting up components
export default function Item({ item, onDeleteItem, onToggleitems }) {
  // Destructuring 'item' from props
  return (
    <li>
      {/* checked - bool values */}
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleitems(item.id)}
      />
      {/* conditional styling */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
