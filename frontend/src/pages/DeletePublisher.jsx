import { useState, useEffect } from "react";

export default function DeletePublisher() {
  const [publishers, setPublishers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/publishers")
      .then(res => res.json())
      .then(data => setPublishers(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/publishers/${selectedId}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("Publisher deleted!");
        setPublishers(publishers.filter(p => p.id !== parseInt(selectedId)));
        setSelectedId("");
      } else {
        setMessage("Failed to delete publisher");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Delete Publisher</h2>
      <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
        <option value="">Select publisher</option>
        {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <button onClick={handleDelete} disabled={!selectedId}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}
