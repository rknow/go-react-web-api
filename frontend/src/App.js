import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import CreatePulisher  from "./pages/CreatePublisher";
import EditPublisher from "./pages/EditPublisher";
import ViewPublisher from "./pages/ViewPublisher";
import DeletePublisher from "./pages/DeletePublisher";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<ViewPublisher />} />
          <Route path="/create" element={<CreatePulisher />} />
          <Route path="/edit" element={<EditPublisher />} />
          <Route path="/delete" element={<DeletePublisher />} />
        </Routes>
      </div>
    </Router>
  );
}
