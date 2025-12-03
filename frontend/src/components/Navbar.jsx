import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
      <Link to="/" style={{ margin: "0 10px" }}>View Publisher</Link>
      <Link to="/create" style={{ margin: "0 10px" }}>Create Publisher</Link>
      <Link to="/edit" style={{ margin: "0 10px" }}>Edit Publisher</Link>
      <Link to="/delete" style={{ margin: "0 10px" }}>Delete Publisher</Link>
    </nav>
  );
}
