import { useState, useEffect } from "react";

export default function EditPublisher() {
  const [publishers, setPublishers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/publishers")
      .then(res => res.json())
      .then(data => setPublishers(data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/publishers/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (res.ok) {
        setMessage("Publisher updated!");
        setNewName("");
      } else {
        setMessage("Failed to update publisher");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Edit Publisher</h2>
      <form onSubmit={handleEdit}>
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)} required>
          <option value="">Select publisher</option>
          {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input
          type="text"
          placeholder="New name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
