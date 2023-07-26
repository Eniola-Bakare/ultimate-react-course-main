export default function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer className="stats">
        <p>Plan your needed effects for your adventure 👌</p>
      </footer>
    );

  const itemsLength = items.length || 0;
  const packedLength = items.filter((item) => item.packed).length || 0;
  const percentage = Math.round((packedLength / itemsLength) * 100);

  return (
    <footer className="stats">
      {percentage === 100
        ? "You are ready to go ✈"
        : `You have ${itemsLength} items on your list, and you already packed${" "}
      ${packedLength} (${percentage}%)`}
    </footer>
  );
}
