import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleSUb(newItem) {
    setItems((prevList) => [...prevList, newItem]);
  }
  function handleDelete(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  function handleDone(id) {
    setItems((prevItems) =>
      prevItems.map((eachItem) => {
        return eachItem.id === id
          ? { ...eachItem, packed: !eachItem.packed }
          : eachItem;
      })
    );
  }
  function clearList() {
    const confirmed = window.confirm("Deleting all items?");
    confirmed && setItems([]);
  }
  return (
    <div>
      <Logo />
      <Form addHandleSub={handleSUb} />
      <PackingList
        itemProp={items}
        addDelete={handleDelete}
        handleDone={handleDone}
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
