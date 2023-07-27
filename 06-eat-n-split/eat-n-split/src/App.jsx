import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendsArr, setFriendsArr] = useState(initialFriends);
  const [selectForm, setSelectForm] = useState(false);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleAdd() {
    setShowAddFriend((prev) => !prev);
    setSelectForm(false);
  }
  function handleFriendAdd(friend) {
    setFriendsArr((prevList) => [...prevList, friend]);
  }
  function handleSplit(val) {
    setFriendsArr((friendsArr) =>
      friendsArr.map((friend) => {
        return friend.id === selectFriend.id
          ? { ...friend, balance: Number(friend.balance) + val }
          : friend;
      })
    );
    setSelectFriend(null);
  }

  function handleSelectButton(friend) {
    setSelectFriend((select) => (friend.id === select?.id ? null : friend));
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendsList={friendsArr}
          selectBtn={handleSelectButton}
          selectFriend={selectFriend}
        />

        {showAddFriend && (
          <FormAddFriend onAdd={handleFriendAdd} hideForm={handleAdd} />
        )}

        <Button onAdd={handleAdd}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>

      {selectFriend && (
        <FormSplitBill selectFriend={selectFriend} handleSplit={handleSplit} />
      )}
    </div>
  );
}

export default App;

function FriendList({ friendsList, selectBtn, selectFriend }) {
  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectBtn={selectBtn}
          selectFriend={selectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectBtn, selectFriend }) {
  let isFriend = friend.id === selectFriend?.id;
  // console.log(isFriend);
  return (
    <>
      <li className={isFriend ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {friend.balance}&euro;
          </p>
        )}
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}&euro;
          </p>
        )}
        {friend.balance === 0 && <p>You and your friend are even</p>}
        <Button onAdd={() => selectBtn(friend)}>
          {isFriend ? "Close" : "Select"}
        </Button>
      </li>
    </>
  );
}

function Button({ onAdd, children, selectBtn }) {
  return (
    <button onClick={onAdd} className="button">
      {children}
    </button>
  );
}

function FormAddFriend({ onAdd, hideForm }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAdd(e) {
    e.preventDefault();

    if (!name || !image) return;

    hideForm();
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    onAdd(newFriend);
    setImage("https://i.pravatar.cc/48");
    setName("");
  }
  return (
    <form className="form-add-friend">
      <label>👨🏿‍🤝‍👨🏿 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼 Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button onAdd={handleAdd}>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectFriend, handleSplit }) {
  const [bill, setBill] = useState("");
  const [userBill, setUserBill] = useState("");
  const friendBill = bill ? bill - userBill : "";
  const [whoPays, setWhoPays] = useState("user");

  useEffect(() => {
    setBill("");
    setUserBill("");
    setWhoPays("user");
  }, [selectFriend]);

  function handleBillSplit(e) {
    e.preventDefault();
    if (bill === "" || userBill === "") return;
    handleSplit(whoPays === "user" ? friendBill : -userBill);
  }
  return (
    <form className="form-split-bill" onSubmit={handleBillSplit}>
      <h2>Split a bill with {selectFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🚶 Your bill</label>
      <input
        type="number"
        value={userBill}
        onChange={(e) =>
          setUserBill(
            Number(e.target.value) > bill ? userBill : Number(e.target.value)
          )
        }
      />

      <label>👨🏿‍🤝‍👨🏿 {selectFriend.name}'s expenses</label>
      <input type="number" disabled value={friendBill} />

      <label>🤑 who is paying the bill?</label>
      <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value={"user"}>You</option>
        <option value={"friend"}>{selectFriend.name}</option>
      </select>
      <Button>Split the bill</Button>
    </form>
  );
}
