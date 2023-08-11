// to add new items to the array
import { useState } from "react";
export default function Form({ onAddItems }) {
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
