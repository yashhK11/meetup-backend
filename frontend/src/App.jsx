import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import EventList from "./component/EventList";
import EventDetail from "./component/EventDetail";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-light bg-light px-4 d-flex justify-content-between">
      <span
        className="navbar-brand fw-bold text-danger fs-4"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Meetup
      </span>
      <input
        type="text"
        className="form-control w-25"
        placeholder="Search by title and tags..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </nav>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("Both");

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="container pt-3 d-flex justify-content-end">
                <select
                  className="form-select w-auto"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="Both">Select Event Type</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <EventList searchQuery={searchQuery} filterType={filterType} />
            </div>
          }
        />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}
