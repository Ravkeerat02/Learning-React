import { useState } from "react";
import Item from "./Item";
export default function PackingList({
  items,
  onDeleteItem,
  onToggleitems,
  onClearList,
}) {
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
