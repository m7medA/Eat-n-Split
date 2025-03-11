import { useState } from "react";

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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handelShowForm() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handelSetFriends(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  function handelSelectedDriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }

  function handelSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FreindList
          friends={friends}
          onSelectedFriend={handelSelectedDriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onSetFriends={handelSetFriends} />}
        <Button onClick={handelShowForm}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handelSplitBill}
        />
      )}
    </div>
  );
}

function FreindList({ friends, onSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectedFriend={onSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectedFriend, selectedFriend }) {
  const isSelcted = selectedFriend?.id === friend.id;

  return (
    <li className={isSelcted ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p>
          You and {friend.name} {Math.abs(friend.balance)} are even
        </p>
      )}
      <Button onClick={() => onSelectedFriend(friend)}>
        {isSelcted ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onSetFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        e.preventDefault();

        if (!name || !image) return;

        const id = crypto.randomUUID();
        const newFriend = {
          id,
          name,
          image: `${image}?=${id}`,
          balance: 0,
        };
        onSetFriends(newFriend);
        setName("");
        setImage("https://i.pravatar.cc/48");
      }}
    >
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handelSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handelSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill Value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>Your expense</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />

      <label>{selectedFriend.name} is expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="Friend">{selectedFriend.name}</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}
