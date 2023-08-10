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
  // setting up event handler
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you neecd for your trip 🛣️ trip ?</h3>
      {/* setting up form */}
      <select>
        {/* creating dynamic list  */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item...." />
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
