// example of child to parent communication

import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState([initialItems]);

  function handleAddItems(item) {
    // new array - inlcusive of the original array
    //adding new items to the current array
    // anything can be passed as prop
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    // loop over teh array - look for item with specific id
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    // creates a new obj baseed on current item an updates recordingly
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      {/* adding items to the list */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleitems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
// setting up components

function Logo() {
  return <h1>🏝️ Far Away 🎒</h1>;
}

// to add new items to the array
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // setting up event handler
  function handleSubmit(e) {
    e.preventDefault();

    // guard clasue
    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    console.log(newItem);

    onAddItems(newItem);

    // reset form
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 🛣️?</h3>
      {/* Setting up form */}
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {/* Creating dynamic list */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        // Reads the value of the input field
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleitems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  // for 3 different conditions
  let sortedItems;
  // sorting by input
  if (sortBy === "input") sortedItems = items;
  // sorting alphabetically
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  // sorting by packing status
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleitems={onToggleitems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {/* order by which they were placed */}
          <option value="input">Sort by Input Order</option>
          {/* sort by description */}
          <option value="description">Sort by Description</option>
          {/* sort by packing status */}
          <option value="packed">Sort by Packing Status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleitems }) {
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

function Stats({ items }) {
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
