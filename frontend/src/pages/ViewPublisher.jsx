import { useEffect, useState } from "react";

export default function ViewPublisher() {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    fetch("/api/publishers")
      .then(res => res.json())
      .then(data => setPublishers(data))
      .catch(err => console.error("Error fetching publishers:", err));
  }, []);

  return (
    <div>
      <h2>Publishers</h2>
      {publishers.length === 0 ? (
        <p>No publishers found.</p>
      ) : (
        <ul>
          {publishers.map(publisher => (
            <li key={publisher.id}>{publisher.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
