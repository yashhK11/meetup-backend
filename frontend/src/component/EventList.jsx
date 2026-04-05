import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

const EventList = ({ searchQuery, filterType }) => {
  const navigate = useNavigate();
  const { data, loading } = useFetch("http://localhost:3000/events");

  const filtered = data?.filter((event) => {
    const matchesType = filterType === "Both" || event.type === filterType;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesType && matchesSearch;
  });

  if (loading) return <p className="p-3">Loading...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Meetup Events</h2>
      <div className="row">
        {filtered?.map((event) => (
          <div className="col-md-4 mb-4" key={event._id}>
            <div
              className="card h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/events/${event._id}`)}
            >
              <img
                src={event.image}
                className="card-img-top"
                alt={event.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <span className="badge bg-secondary mb-2">
                  {event.type} Event
                </span>
                <p className="text-muted small mb-1">
                  {event.date} • {event.time}
                </p>
                <h5 className="card-title">{event.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
