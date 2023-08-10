import { useState, useEffect } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
// setting up components

function Logo() {
  return <h1>🏝️ Far Away 🎒</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // setting up event handler
  function handleSubmit(e) {
    e.preventDefault();

    // guard clasue
    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    console.log(newItem);

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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key-={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  // Destructuring 'item' from props
  return (
    <li>
      {/* conditional styling */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      You have X items in your list and you packed x(x%)
    </footer>
  );
}
