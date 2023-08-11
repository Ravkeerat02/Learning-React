// example of child to parent communication

import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import Stats from "./Stats";
import PackingList from "./packingList";
// import Item from "./Item";

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
