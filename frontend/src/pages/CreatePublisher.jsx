import { useState } from "react";

export default function CreatePublisher() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/publishers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setMessage("Publisher created!");
        setName("");
      } else {
        setMessage("Failed to create publisher");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Create Publisher</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Publisher name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
