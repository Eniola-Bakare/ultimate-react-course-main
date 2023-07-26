import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  itemProp,
  addDelete,
  handleDone,
  clearList,
}) {
  const [sortBy, setSortBy] = useState("description");

  let sortedItems;
  if (sortBy === "input") sortedItems = itemProp;
  if (sortBy === "description")
    sortedItems = itemProp
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = itemProp
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            addDelete={addDelete}
            handleDone={handleDone}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={clearList}>CLear List</button>
      </div>
    </div>
  );
}
